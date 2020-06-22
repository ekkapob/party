ACCESS_SECRET ?= 4747ngxKqYEPWhdxdPkwjLtLYVPP4zMP
DATABASE ?= postgres://postgres:uazkRErpBfAt8ufj7S7exUr9bYMSE2se@localhost:5433/party_development?sslmode=disable
PORT ?= :4100

dev:
	ACCESS_SECRET=$(ACCESS_SECRET) PORT=$(PORT) DB=$(DATABASE) go run main.go

migrate-create:
	migrate create -ext sql -dir migrations $(name)

migrate-up:
	migrate -path migrations -database $(DATABASE) up

migrate-down:
	migrate -path migrations -database $(DATABASE) down

migrate-force:
	migrate -path migrations -database $(DATABASE) force $(version)

psql:
	psql -h localhost -p 5433 -U postgres
