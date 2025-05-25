package user

import (
	"context"
	"ztp/internal/models"
	"ztp/internal/repository"
)

type UserCreateService interface {
	CreateUser(ctx context.Context, request *models.CreateUserRequest) error
}

type UserRetrieverService interface {
	GetByUsername(ctx context.Context, username string) (*repository.User, error)
	GetByEmail(ctx context.Context, email string) (*repository.User, error)
}

type UserAuthenticationService interface {
	Login(ctx context.Context, request *models.LoginRequest) (*string, error)
}
