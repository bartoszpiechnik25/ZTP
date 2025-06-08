package main

import (
	"context"
	"embed"
	"strings"
	"ztp/internal/config"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

//go:embed migrations/*sql
var fs embed.FS

//go:embed migrations/init_documents.sql
var seedSQL string

func main() {
	err := run()
	if err != nil {
		logrus.Fatal(err)
	}
	logrus.Info("migration succeeded")
}

func run() error {
	migrations, err := iofs.New(fs, "migrations")
	if err != nil {
		return err
	}
	config, err := config.New()
	if err != nil {
		return err
	}
	defer func() {
		err = migrations.Close()
		if err != nil {
			logrus.Error(err)
		}
	}()
	m, err := migrate.NewWithSourceInstance("iofs", migrations, config.DbConfig.GetConnUrl())
	if err != nil {
		return errors.Wrap(err, "cannot create migration")
	}
	if err := m.Up(); err != nil {
		if !errors.Is(err, migrate.ErrNoChange) {
			return errors.Wrap(err, "migration failed")
		}
		logrus.Info("migrations: no change in schema")
	}

	if err := executeSeedSQL(config.DbConfig.GetConnUrl()); err != nil {
		return errors.Wrap(err, "could not populate documents data")
	}
	return nil
}

func executeSeedSQL(connStr string) error {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, connStr)
	if err != nil {
		return err
	}
	defer pool.Close()

	stmts := strings.SplitSeq(seedSQL, ";")
	for stmt := range stmts {
		stmt = strings.TrimSpace(stmt)
		if stmt == "" {
			continue
		}
		_, err := pool.Exec(ctx, stmt)
		if err != nil {
			var pgErr *pgconn.PgError
			if errors.As(err, &pgErr) && pgErr.Code == "23505" {
				logrus.Warnf("Skipping duplicate insert: %v", pgErr.Message)
				continue
			}
			return err
		}
	}
	return nil
}
