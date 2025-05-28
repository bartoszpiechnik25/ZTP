package main

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"ztp/internal/config"
	"ztp/internal/gen/document/intelligence/v1"
	"ztp/internal/grpc/callback"
	
	"ztp/internal/server"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
)

var cfg *config.Config

func runHttp() error {
	logrus.Info("connecting to database")
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, cfg.DbConfig.GetConnUrl())
	if err != nil {
		return errors.Wrap(err, "could not create connection pool")
	}
	s := server.New(cfg, pool)
	s.ConfigureHandlers()
	logrus.Info(fmt.Sprintf("starting serving on :%s", cfg.ServerConfig.Port))
	return http.ListenAndServe(":"+cfg.ServerConfig.Port, s.Router)
}

func rungRPC() error {
	lis, err := net.Listen("tcp", ":"+cfg.GrpcConfig.CallbackPort)
	if err != nil {
		logrus.Fatalf("could not create listener on port: %s", cfg.GrpcConfig.CallbackPort)
	}
	s := grpc.NewServer()
	calbackServer := callback.New(cfg)
	intelligence.RegisterDocumentIntelligenceCallbackServiceServer(s, calbackServer)
	logrus.Infof("Serving gRPC callback server on port: %s", cfg.GrpcConfig.CallbackPort)
	return s.Serve(lis)
}

func main() {
	ctx := context.Background()
	group, wctx := errgroup.WithContext(ctx)
	loadConfig()

	group.Go(func() error {
		if err := runHttp(); err != nil {
			wctx.Done()
			return err
		}
		return nil
	})
	group.Go(func() error {
		if err := rungRPC(); err != nil {
			wctx.Done()
			return err
		}
		return nil
	})

	logrus.Fatal(group.Wait())
}

func loadConfig() {
	c, err := config.New()
	logrus.Info("loading config")
	if err != nil {
		logrus.Fatal(errors.Wrap(err, "could not load config"))
	}
	cfg = c
}
