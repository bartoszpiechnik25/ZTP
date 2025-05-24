package user

import (
	"context"
	"ztp/internal/domain"
	"ztp/internal/models"
	repository "ztp/internal/repositories"
	"ztp/internal/utils"

	e "ztp/internal/error"

	"github.com/pkg/errors"
)

type UserAutenthicationServiceImpl struct {
	repository domain.Store
}

func NewUserAuthenticationService(repo *repository.Repository) UserAutenthicationServiceImpl {
	return UserAutenthicationServiceImpl{
		repository: repo.Queries,
	}
}

func (u UserAutenthicationServiceImpl) Login(ctx context.Context, request *models.LoginRequest) error {
	user, err := u.repository.GetUserByUsername(ctx, request.Username)
	if err != nil {
		return errors.Wrapf(err, "could not retrieve user with username: %s", request.Username)
	}
	err = utils.ValidPasswordHash(user.Password, request.Password)
	if err != nil {
		return errors.Wrapf(e.ErrInvalidPassword, "invalid password for user with username: %s", user.Username)
	}
	return nil
}
