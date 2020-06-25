# Party
Check the app here: http://159.65.15.131:8000

### What is Party?
https://docs.google.com/document/d/1KgHsuovsrT60cQQNCn5XofMb891OzliXnghK9obkkmg/edit?usp=sharing

### Prerequisites

- Reactjs
- Docker and Docker-compose
- Golang
- Migrate (DB Migration tool) (https://github.com/golang-migrate/migrate/releases)
- Set `.env` in `/party` with
```
REACT_APP_KEY=party_development
REACT_APP_API_V1=/api/v1
```

### Installation
```
$ cd party
$ npm i
$ cd server
$ go mod download
$ docker-compose up -d
```

#### Start Backend Server
In `/party/server`
```
# this should run only once at the beginning
# to migrate and prepare database
$ make migrate-up

# to start the server (development mode)
$ make dev
```

#### Start React Server
In `/party`
```
$ npm start
```

