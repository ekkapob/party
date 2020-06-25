# Party
Check the app here: http://159.65.15.131:8000

### What is Party?
https://docs.google.com/document/d/1KgHsuovsrT60cQQNCn5XofMb891OzliXnghK9obkkmg/edit?usp=sharing

### Prerequisites

- Reactjs
- Docker and Docker-compose
- Golang
- Migrate (DB Migration tool) (https://github.com/golang-migrate/migrate/releases)

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
$ make migrate-up
$ make dev
```

### Start React Server
In `/party`
```
$ npm start
```

