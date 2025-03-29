package main

import (
	"embed"
	"ztp/internal/config"
	"ztp/internal/logger"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

//go:embed migrations/*sql
var fs embed.FS

func main() {
	log := logger.New(false)
	err := run(log)
	if err != nil {
		log.Fatal(err)
	}
	log.Info("migration succeeded")

}

func run(logger *logrus.Logger) error {
	migrations, err := iofs.New(fs, "migrations")
	if err != nil {
		return err
	}
	config, err := config.NewDbConfig()
	if err != nil {
		return err
	}
	defer migrations.Close()
	m, err := migrate.NewWithSourceInstance("iofs", migrations, config.GetConnUrl())

	if err != nil {
		return errors.Wrap(err, "cannot create migration")
	}
	if err := m.Up(); err != nil {
		if !errors.Is(err, migrate.ErrNoChange) {
			return errors.Wrap(err, "migration failed")
		}
		logger.Info("migrations: no change in schema")
	}
	return nil
}
