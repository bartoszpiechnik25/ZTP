package domain

import (
	"context"
	db "ztp/internal/repositories/sqlc"
)

type AddUserStore interface {
	AddUser(ctx context.Context, arg db.AddUserParams) error
}
