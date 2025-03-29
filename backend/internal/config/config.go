package config

import (
	"fmt"
	"os"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
	"github.com/pkg/errors"
)

type DbConfig struct {
	DbName   string `env:"POSTGRES_DB"`
	Host     string `env:"POSTGRES_HOST"`
	User     string `env:"POSTGRES_USER"`
	Password string `env:"POSTGRES_PASSWORD"`
	Port     string `env:"POSTGRES_PORT"`
}

func NewDbConfig() (*DbConfig, error) {
	if err := godotenv.Load(); err != nil {
		return nil, errors.Wrap(err, "could not load .env file")
	}
	var config DbConfig
	err := env.Parse(&config)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse .env file")
	}
	if in_docker_container := os.Getenv("IN_DOCKER_CONTAINER"); in_docker_container == "true" {
		config.Host = "postgres"
		config.Port = "5432"
	}

	return &config, nil
}

func (c *DbConfig) GetConnUrl() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", c.User, c.Password, c.Host, c.Port, c.DbName)

}
