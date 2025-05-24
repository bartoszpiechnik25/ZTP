package user

import (
	"context"
	"ztp/internal/domain"
	"ztp/internal/models"
	repository "ztp/internal/repositories"
	db "ztp/internal/repositories/sqlc"
	"ztp/internal/utils"

	"github.com/google/uuid"
	"github.com/pkg/errors"

	e "ztp/internal/error"
)

type UserCreateServiceImpl struct {
	userStore domain.AddUserStore
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
	err = h.userStore.AddUser(ctx, db.AddUserParams{
		ID:          userUUID,
		Name:        request.Name,
		Surname:     request.Surname,
		Email:       request.Email,
		Password:    *passwordHash,
		PhoneNumber: request.PhoneNumber,
		Username:    request.Username,
		UserRole:    db.UserRole(request.Role),
	})
	return e.HandleDbError(err)
}
