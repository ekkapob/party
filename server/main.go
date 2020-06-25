package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	cxt "party/context"
	"party/handlers"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v4"
)

func main() {
	db := NewDB()
	defer db.Close(context.Background())

	c := cxt.Context{
		DB: db,
	}

	port := os.Getenv("PORT")
	fmt.Println("server is running on " + port)
	http.ListenAndServe(port, NewRouter(c))
}

func NewDB() *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DB"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn
}

func NewRouter(c cxt.Context) *mux.Router {
	r := mux.NewRouter()

	s := r.PathPrefix("/api/v1").Subrouter()

	s.HandleFunc("/parties/{id:[0-9]+}", handlers.Party(c)).Methods("GET")
	s.HandleFunc("/parties/{id:[0-9]+}/join", handlers.JoinParty(c)).Methods("POST")
	s.HandleFunc("/parties/{id:[0-9]+}/leave", handlers.LeaveParty(c)).Methods("POST")
	s.HandleFunc("/parties", handlers.CreateParty(c)).Methods("POST")
	s.HandleFunc("/parties", handlers.Parties(c)).Methods("GET")

	s.HandleFunc("/signin", handlers.Signin(c)).Methods("POST")
	s.HandleFunc("/signup", handlers.Signup(c)).Methods("POST")
	s.HandleFunc("/refresh_token", handlers.RefreshToken(c)).Methods("POST")

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	return r
}
