package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	cxt "party/context"
	"party/internal/auth"
	"time"
)

func Signin(c cxt.Context) http.HandlerFunc {
	type Request struct {
		Email    string
		Password string
	}

	type Response struct {
		AccountID    int    `json:"account_id"`
		Email        string `json:"email"`
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		Exp          int64  `json:"exp"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		decoder := json.NewDecoder(r.Body)
		var req Request
		err := decoder.Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if req.Email == "" || req.Password == "" {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		row := c.DB.QueryRow(context.Background(),
			`SELECT id, password FROM accounts WHERE email = $1`,
			req.Email,
		)

		var id int
		var password string
		err = row.Scan(&id, &password)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if !auth.CheckPasswordHash(req.Password, password) {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		accessTokenExpAt := time.Now().Add(ACCESS_TOKEN_EXPIRE_DURATION).Unix()
		refreshTokenExpAt := time.Now().Add(REFRESH_TOKEN_EXPIRE_DURATION).Unix()
		accessToken, err := auth.CreateToken(id, accessTokenExpAt)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		refreshToken, err := auth.CreateToken(id, refreshTokenExpAt)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		resp, err := json.Marshal(Response{
			AccountID:    id,
			Email:        req.Email,
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
			Exp:          accessTokenExpAt,
		})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(resp)
	}
}
