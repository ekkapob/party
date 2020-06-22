package handlers

import (
	"errors"
	"net/http"
	"party/internal/auth"
	"strings"
)

func GetAccountID(r *http.Request) (int, error) {
	errorMsg := "invalid auth token"
	authHeaders := r.Header["Authorization"]
	if len(authHeaders) < 1 || authHeaders[0] == "" {
		return 0, errors.New(errorMsg)
	}

	subStrs := strings.Split(authHeaders[0], " ")
	if len(subStrs) < 2 || subStrs[1] == "" {
		return 0, errors.New(errorMsg)
	}

	token := subStrs[1]
	accountID, err := auth.VerifyToken(token)
	if err != nil {
		return 0, errors.New(errorMsg)
	}

	return accountID, nil
}
