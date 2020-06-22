package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	cxt "party/context"
	"strconv"
)

const LIMIT = 12

func Parties(c cxt.Context) http.HandlerFunc {
	type Party struct {
		ID       int    `json:"id"`
		Title    string `json:"title"`
		OwnerID  int    `json:"owner_id"`
		Capacity int    `json:"capacity"`
		Members  int    `json:"members"`
	}

	type Parties struct {
		Parties      []Party `json:"parties"`
		TotalParties int     `json:"total_parties"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		pageParams := r.URL.Query()["page"]
		page := 1
		if len(pageParams) > 0 {
			i, err := strconv.Atoi(pageParams[0])
			if err == nil {
				page = i
			}
		}
		offset := LIMIT * (page - 1)

		rows, err := c.DB.Query(context.Background(),
			`SELECT id, title, owner_id, capacity,
			(
				SELECT count(*) FROM accounts_parties
				WHERE party_id = parties.id
			) AS members,
			count(*) OVER() as total_parties
			FROM parties
			ORDER by created_at DESC
			LIMIT $1
			OFFSET $2
			`,
			LIMIT, offset,
		)
		if err != nil {
			log.Println("unable to fetch parties:", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		parties := []Party{}

		var total_parties int
		for rows.Next() {
			var id, owner_id, capacity, members int
			var title string

			err = rows.Scan(&id, &title, &owner_id, &capacity, &members, &total_parties)
			if err != nil {
				fmt.Println("unable to scan party rows:", err)
				continue
			}
			parties = append(parties, Party{
				ID:       id,
				OwnerID:  owner_id,
				Title:    title,
				Capacity: capacity,
				Members:  members,
			})
		}

		resp, err := json.Marshal(Parties{
			Parties:      parties,
			TotalParties: total_parties,
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
