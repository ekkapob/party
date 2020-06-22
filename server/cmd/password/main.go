package main

import (
	"fmt"
	"os"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("[ERROR] please provide the password the be generated")
		fmt.Println("$ password {password}")
		os.Exit(1)
	}

	password := os.Args[1]
	hash, _ := HashPassword(password)

	if !CheckPasswordHash(password, hash) {
		fmt.Println("[ERROR] cannot generate password")
		os.Exit(1)
	}

	fmt.Println(hash)
}
