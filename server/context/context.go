package context

import (
	"sync"

	"github.com/jackc/pgx/v4"
)

type Context struct {
	sync.Mutex
	DB *pgx.Conn
}
