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
	GrpcConfig   *GrpcConfig
	AwsConfig    *AwsConfig
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

	var grpcConfig GrpcConfig
	err = env.Parse(&grpcConfig)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse .env file")
	}

	var awsConfig AwsConfig
	err = env.Parse(&awsConfig)
	if err != nil {
		return nil, errors.Wrap(err, "could not parse .env file")
	}

	return &Config{
		DbConfig:     &dbConfig,
		ServerConfig: &serverConfig,
		GrpcConfig:   &grpcConfig,
		AwsConfig:    &awsConfig,
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
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		c.User,
		c.Password,
		c.Host,
		c.Port,
		c.DbName,
	)
}

type ServerConfig struct {
	Port         string `env:"SERVER_PORT"`
	Timeout      int    `env:"SERVER_TIMEOUT"`
	JwtAlgo      string `env:"JWT_ALGO"`
	JwtSecretKey string `env:"JWT_SECRET_KEY"`
}

type GrpcConfig struct {
	SchedulerGrpcAddr string `env:"SCHEDULER_GRPC_ADDR"`
	OcrCallbackPort   string `env:"OCR_CALLBACK_PORT"`
	CallbackPort      string `env:"CALLBACK_PORT"`
}

type AwsConfig struct {
	AwsAccessKey       string `env:"AWS_ACCESS_KEY"`
	AesSecretAccessKey string `env:"AWS_SECRET_ACCESS_KEY"`
	AwsDefaultRegion   string `env:"AWS_DEFAULT_REGION"`
}
