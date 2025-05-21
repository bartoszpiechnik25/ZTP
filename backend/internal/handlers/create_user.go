package handlers

import (
	"context"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"ztp/internal/models"
	repository "ztp/internal/repositories"
	sqlcrepositiories "ztp/internal/repositories/sqlc"
)

type CreateUser struct {
	createUserRepository *repository.Repository
}

func NewCreateUserHandler(repo *repository.Repository) CreateUser {
	return CreateUser{
		createUserRepository: repo,
	}
}

func (h CreateUser) Handle(ctx context.Context, request *models.CreateUserRequest) error {
	user_id := uuid.New()
	err := h.createUserRepository.Queries.AddUser(ctx, sqlcrepositiories.AddUserParams{
		ID:          user_id,
		Name:        request.Name,
		Surname:     request.Surname,
		Email:       request.Email,
		PhoneNumber: request.PhoneNumber,
		Username:    request.Username,
		UserRole:    sqlcrepositiories.UserRole(request.Role),
	})
	if err != nil {
		return errors.Wrap(err, "could not create new user")
	}
	return nil
}
