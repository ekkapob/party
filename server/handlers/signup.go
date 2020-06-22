package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	cxt "party/context"
	"party/internal/password"
	"regexp"
	"strings"
)

func Signup(c cxt.Context) http.HandlerFunc {
	type Request struct {
		Email                string `json:"email"`
		Password             string `json:"password"`
		PasswordConfirmation string `json:"password_confirmation"`
		Consent              bool   `json:"consent"`
		Subscription         bool   `json:"subscription"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		decoder := json.NewDecoder(r.Body)
		var req Request
		err := decoder.Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if len(strings.TrimSpace(req.Email)) == 0 ||
			len(strings.TrimSpace(req.Password)) == 0 ||
			req.Password != req.PasswordConfirmation ||
			!ValidEmail(req.Email) {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		row := c.DB.QueryRow(context.Background(),
			`SELECT EXISTS(SELECT 1 FROM accounts WHERE email = $1)`,
			req.Email,
		)
		var exists bool
		err = row.Scan(&exists)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if exists {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		hashedPassword, err := password.HashPassword(req.Password)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		_, err = c.DB.Exec(context.Background(),
			`INSERT INTO accounts (email, password, consent, subscription)
			VALUES ($1, $2, $3, $4)`,
			req.Email, hashedPassword, req.Consent, req.Subscription)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)

	}
}

func ValidEmail(email string) bool {
	regexp := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return regexp.MatchString(email)
}
