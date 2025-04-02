package main

import (
	"context"
	"fmt"
	"net/http"
	"ztp/internal/config"
	"ztp/internal/logger"
	"ztp/internal/server"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

func run(logger *logrus.Logger) error {
	c, err := config.New()
	logger.Info("loading config")
	if err != nil {
		return errors.Wrap(err, "could not load config")
	}
	logger.Info("connecting to database")
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, c.DbConfig.GetConnUrl())
	if err != nil {
		return errors.Wrap(err, "could not create connection pool")
	}
	s := server.New(c, pool)
	s.ConfigureHandlers()
	logger.Info(fmt.Sprintf("starting serving on :%s", c.ServerConfig.Port))
	return http.ListenAndServe(":"+c.ServerConfig.Port, s.Router)
}

func main() {
	log := logger.New(false)
	err := run(log)
	if err != nil {
		log.Fatal(err)
	}
}
