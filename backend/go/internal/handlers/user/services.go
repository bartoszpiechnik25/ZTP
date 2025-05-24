package user

import (
	"context"
	"ztp/internal/models"
	db "ztp/internal/repositories/sqlc"
)

type UserCreateService interface {
	CreateUser(ctx context.Context, request *models.CreateUserRequest) error
}

type UserRetrieverService interface {
	GetByUsername(ctx context.Context, username string) (*db.User, error)
	GetByEmail(ctx context.Context, email string) (*db.User, error)
}

type UserAuthenticationService interface {
	Login(ctx context.Context, request *models.LoginRequest) error
}
