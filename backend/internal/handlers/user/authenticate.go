package user

import (
	"context"
	"ztp/internal/models"
	repository "ztp/internal/repositories"
	"ztp/internal/utils"

	e "ztp/internal/error"

	"github.com/pkg/errors"
)

type UserAutenthicationServiceImpl struct {
	repository *repository.Repository
}

func NewUserAuthenticationService(repo *repository.Repository) UserAutenthicationServiceImpl {
	return UserAutenthicationServiceImpl{
		repository: repo,
	}
}

func (u UserAutenthicationServiceImpl) Login(ctx context.Context, request *models.LoginRequest) error {
	user, err := u.repository.Queries.GetUserByUsername(ctx, request.Username)
	if err != nil {
		return errors.Wrapf(err, "could not retrieve user with username: %s", request.Username)
	}
	err = utils.ValidPasswordHash(user.Password, request.Password)
	if err != nil {
		return errors.Wrapf(e.InvalidPasswordError, "invalid password for user with username: %s", user.Username)
	}
	return nil
}
