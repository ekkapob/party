FROM golang:1.14-alpine

# install development essentials to alpine
RUN apk add --update alpine-sdk

WORKDIR /go/src/app

# install DB migration tool
RUN wget https://github.com/golang-migrate/migrate/releases/download/v4.11.0/migrate.linux-amd64.tar.gz
RUN tar -zxvf migrate.linux-amd64.tar.gz
RUN mv migrate.linux-amd64 migrate
RUN mv migrate $GO/bin/

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go install

CMD ["make", "dev"]
