package context

import "github.com/jackc/pgx/v4"

type Context struct {
	DB *pgx.Conn
}
