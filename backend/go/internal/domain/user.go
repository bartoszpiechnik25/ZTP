package domain

import (
	"context"
	db "ztp/internal/repositories/sqlc"

	"github.com/google/uuid"
)

type Store interface {
	AddUserStore
	GetUserStore
}

type AddUserStore interface {
	AddUser(ctx context.Context, arg db.AddUserParams) error
}

type GetUserStore interface {
	GetUserByUsername(ctx context.Context, username string) (db.User, error)
	GetUserByID(ctx context.Context, user_id uuid.UUID) (db.User, error)
	GetUserByEmail(ctx context.Context, email string) (db.User, error)
	UserExists(ctx context.Context, username string) (db.UserExistsRow, error)
}
