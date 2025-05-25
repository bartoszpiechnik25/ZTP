package user

import (
	"context"
	"ztp/internal/models"
	"ztp/internal/repository"
	"ztp/internal/utils"

	"github.com/google/uuid"
	"github.com/pkg/errors"

	e "ztp/internal/error"
)

type UserCreateServiceImpl struct {
	userStore repository.Store
}

func NewUserCreateService(repo *repository.Repository) UserCreateServiceImpl {
	return UserCreateServiceImpl{
		userStore: repo.Queries,
	}
}

func (h UserCreateServiceImpl) CreateUser(ctx context.Context, request *models.CreateUserRequest) error {
	userUUID := uuid.New()
	passwordHash, err := utils.HashPassword(request.Password)
	if err != nil {
		return errors.Wrapf(err, "could not create password hash for user: %s", request.Username)
	}
	err = h.userStore.AddUser(ctx, repository.AddUserParams{
		ID:          userUUID,
		Name:        request.Name,
		Surname:     request.Surname,
		Email:       request.Email,
		Password:    *passwordHash,
		PhoneNumber: request.PhoneNumber,
		Username:    request.Username,
		UserRole:    repository.UserRole(request.Role),
	})
	return e.HandleDbError(err)
}
