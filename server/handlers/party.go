package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	cxt "party/context"

	"github.com/gorilla/mux"
)

func Party(c cxt.Context) http.HandlerFunc {
	type Party struct {
		ID        int    `json:"id"`
		Title     string `json:"title"`
		OwnerID   int    `json:"owner_id"`
		Capacity  int    `json:"capacity"`
		MemberIDs []int  `json:"member_ids"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		partyID := vars["id"]

		row := c.DB.QueryRow(context.Background(),
			`SELECT id, title, owner_id, capacity,
			(
				SELECT ARRAY_AGG(account_id) FROM accounts_parties
				WHERE party_id = parties.id
			) AS member_ids
			FROM parties
			WHERE id = $1
			`, partyID,
		)

		var id, owner_id, capacity int
		var member_ids []int
		var title string

		err := row.Scan(&id, &title, &owner_id, &capacity, &member_ids)
		if err != nil {
			log.Println("cannot fetch a party:", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		resp, err := json.Marshal(Party{
			ID:        id,
			Title:     title,
			OwnerID:   owner_id,
			Capacity:  capacity,
			MemberIDs: member_ids,
		})
		if err != nil {
			log.Println("unable to construct JSON response:", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(resp)
	}
}

func JoinParty(c cxt.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// prevent the data race to join party more than its capacity
		c.Lock()
		defer c.Unlock()

		accountID, err := GetAccountID(r)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		vars := mux.Vars(r)
		partyID := vars["id"]

		row := c.DB.QueryRow(context.Background(),
			`SELECT SUM(1) as members, parties.capacity
			FROM accounts_parties
			INNER JOIN parties
			ON accounts_parties.party_id = parties.id
			WHERE accounts_parties.party_id = $1 GROUP BY parties.id;
			`,
			partyID,
		)
		var members, capacity int
		err = row.Scan(&members, &capacity)
		if members >= capacity {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		_, err = c.DB.Exec(context.Background(),
			`
			INSERT INTO accounts_parties (account_id, party_id)
			SELECT $1, $2
			WHERE
			(SELECT SUM(1) FROM accounts_parties WHERE party_id = $2) <
			(SELECT capacity FROM parties WHERE id = $2)
			`,
			accountID, partyID,
		)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}

func LeaveParty(c cxt.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		accountID, err := GetAccountID(r)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		vars := mux.Vars(r)
		partyID := vars["id"]

		// Do not allow a party owner to leave their own parties
		_, err = c.DB.Exec(context.Background(),
			`DELETE FROM accounts_parties
			WHERE account_id = $1 AND party_id = $2
			AND $1 != (SELECT owner_id FROM parties WHERE id = $2 LIMIT 1)`,
			accountID, partyID,
		)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}

func CreateParty(c cxt.Context) http.HandlerFunc {
	type Request struct {
		Title    string `json:"title"`
		Capacity int    `json:"capacity"`
	}

	const LIMIT_CAPACITY = 10

	return func(w http.ResponseWriter, r *http.Request) {
		accountID, err := GetAccountID(r)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		decoder := json.NewDecoder(r.Body)
		var req Request
		err = decoder.Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if req.Capacity < 2 || req.Capacity > LIMIT_CAPACITY {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		_, err = c.DB.Exec(context.Background(),
			`INSERT INTO parties (title, capacity, owner_id)
			VALUES ($1, $2, $3)`,
			req.Title, req.Capacity, accountID,
		)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}
