# Party
Check the app here: http://159.65.15.131:8000

### What is Party?
https://docs.google.com/document/d/1KgHsuovsrT60cQQNCn5XofMb891OzliXnghK9obkkmg/edit?usp=sharing

### Prerequisites

- Node.js
- Docker
- Docker-compose

### Installation

#### 1. API Server & Database

```
$ cd party
$ cd server
$ docker-compose build
$ docker-compose up -d

# run migrations only at the first start of the database
$ docker exec party_api make migrate-up
```

##### Verify the API server by retrieving all parties

```
$ curl localhost:4100/api/v1/parties
{"parties":[{"id":1,"title":"หาก๊วนร่วมหาร 1","owner_id":1,"capacity":10,"members":2},{"id":2,"title":"หาก๊วนร่วมหาร 2","owner_id":1,"capacity":10,"members":1},{"id":3,"title":"หาก๊วนร่วมหาร 3","owner_id":1,"capacity":10,"members":1},{"id":4,"title":"หาก๊วนร่วมหาร 4","owner_id":1,"capacity":10,"members":1},{"id":5,"title":"หาก๊วนร่วมหาร 5","owner_id":1,"capacity":10,"members":1},{"id":6,"title":"หาก๊วนร่วมหาร 6","owner_id":1,"capacity":10,"members":1},{"id":7,"title":"หาก๊วนร่วมหาร 7","owner_id":1,"capacity":10,"members":1},{"id":8,"title":"หาก๊วนร่วมหาร 8","owner_id":1,"capacity":10,"members":1},{"id":9,"title":"หาก๊วนร่วมหาร 9","owner_id":1,"capacity":10,"members":1},{"id":10,"title":"หาก๊วนร่วมหาร 10","owner_id":1,"capacity":10,"members":1},{"id":11,"title":"หาก๊วนร่วมหาร 11","owner_id":2,"capacity":10,"members":1},{"id":12,"title":"หาก๊วนร่วมหาร 12","owner_id":2,"capacity":10,"members":1}],"total_parties":20}%
```

#### 2. Front-end server

- Create `.env` in `/party` with

```
REACT_APP_KEY=party_development
REACT_APP_API_V1=/api/v1
```

- Enter commands below

```
$ cd party
$ npm start
# you should see a new browser with application homepage
```

