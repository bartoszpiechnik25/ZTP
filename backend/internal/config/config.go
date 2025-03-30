package config

import (
	"fmt"
	"os"

	"github.com/caarlos0/env/v11"
	"github.com/joho/godotenv"
	"github.com/pkg/errors"
)

type Config struct {
	ServerConfig *ServerConfig
	DbConfig     *DbConfig
}

func New() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, errors.Wrap(err, "could not load .env file")
	}
	var dbConfig DbConfig
	err := env.Parse(&dbConfig)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse .env file")
	}
	if in_docker_container := os.Getenv("IN_DOCKER_CONTAINER"); in_docker_container == "true" {
		dbConfig.Host = "postgres"
		dbConfig.Port = "5432"
	}
	var serverConfig ServerConfig
	err = env.Parse(&serverConfig)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse .env file")
	}
	return &Config{
		DbConfig:     &dbConfig,
		ServerConfig: &serverConfig,
	}, nil
}

type DbConfig struct {
	DbName   string `env:"POSTGRES_DB"`
	Host     string `env:"POSTGRES_HOST"`
	User     string `env:"POSTGRES_USER"`
	Password string `env:"POSTGRES_PASSWORD"`
	Port     string `env:"POSTGRES_PORT"`
}

func (c *DbConfig) GetConnUrl() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", c.User, c.Password, c.Host, c.Port, c.DbName)

}

type ServerConfig struct {
	Port    string `env:"SERVER_PORT"`
	Timeout int    `env:"SERVER_TIMEOUT"`
}
