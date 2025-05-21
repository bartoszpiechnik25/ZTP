package repository

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"ztp/internal/config"
	sqlcrepositiories "ztp/internal/repositories/sqlc"
)

type Repository struct {
	Queries *sqlcrepositiories.Queries
}

func New(c *config.DbConfig, postgres *pgxpool.Pool) *Repository {
	return &Repository{
		Queries: sqlcrepositiories.New(postgres),
	}
}
