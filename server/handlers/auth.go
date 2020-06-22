package handlers

import (
	"encoding/json"
	"net/http"
	cxt "party/context"
	"party/internal/auth"
	"time"
)

const (
	ACCESS_TOKEN_EXPIRE_DURATION  = time.Minute * 5
	REFRESH_TOKEN_EXPIRE_DURATION = time.Hour * 24
)

func RefreshToken(c cxt.Context) http.HandlerFunc {
	type Request struct {
		RefreshToken string `json:"refresh_token"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		decoder := json.NewDecoder(r.Body)
		var req Request
		err := decoder.Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		accountID, err := auth.VerifyToken(req.RefreshToken)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		accessTokenExpAt := time.Now().Add(ACCESS_TOKEN_EXPIRE_DURATION).Unix()
		accessToken, err := auth.CreateToken(accountID, accessTokenExpAt)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		refreshTokenExpAt := time.Now().Add(REFRESH_TOKEN_EXPIRE_DURATION).Unix()
		refreshToken, err := auth.CreateToken(accountID, refreshTokenExpAt)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		resp, err := json.Marshal(map[string]interface{}{
			"access_token":  accessToken,
			"refresh_token": refreshToken,
			"exp":           accessTokenExpAt,
		})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(resp))
	}
}
