package repository

import (
	"ztp/internal/config"
	"ztp/internal/domain"
	"ztp/internal/repositories/sqlc"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	Queries domain.Store
}

func New(c *config.DbConfig, postgres *pgxpool.Pool) *Repository {
	return &Repository{
		Queries: db.New(postgres),
	}
}
