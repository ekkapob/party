DATABASE ?= postgres://postgres:uazkRErpBfAt8ufj7S7exUr9bYMSE2se@localhost:5433/party_development?sslmode=disable

migrate-create:
	migrate create -ext sql -dir migrations $(name)

migrate-up:
	migrate -path migrations -database $(DATABASE) up

migrate-down:
	migrate -path migrations -database $(DATABASE) down

migrate-force:
	migrate -path migrations -database $(DATABASE) force $(version)
