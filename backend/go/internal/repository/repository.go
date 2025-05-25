package repository

import (
	"context"
	"ztp/internal/config"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Store interface {
	CreateJob(ctx context.Context, arg CreateJobParams) error
	AddUser(ctx context.Context, arg AddUserParams) error
	GetUserByUsername(ctx context.Context, username string) (User, error)
	GetUserByID(ctx context.Context, user_id uuid.UUID) (User, error)
	GetUserByEmail(ctx context.Context, email string) (User, error)
	UserExists(ctx context.Context, username string) (UserExistsRow, error)
}
type Repository struct {
	Queries Store
}

func NewRepository(c *config.DbConfig, postgres *pgxpool.Pool) *Repository {
	return &Repository{
		Queries: New(postgres),
	}
}
