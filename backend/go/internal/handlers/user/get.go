package user

import (
	"context"
	"ztp/internal/repository"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

type UserRetrieverServiceImpl struct {
	userRepository *repository.Repository
}

func NewUserRetriver(repo *repository.Repository) UserRetrieverServiceImpl {
	return UserRetrieverServiceImpl{
		userRepository: repo,
	}
}

func (h UserRetrieverServiceImpl) ById(ctx context.Context, user_id uuid.UUID) (*repository.User, error) {
	user, err := h.userRepository.Queries.GetUserByID(ctx, user_id)
	if err != nil {
		logrus.Error(err)
		return nil, errors.Wrapf(err, "could not get user with id: %s", user_id.String())
	}
	return &user, nil
}

func (h UserRetrieverServiceImpl) GetByUsername(ctx context.Context, username string) (*repository.User, error) {
	user, err := h.userRepository.Queries.GetUserByUsername(ctx, username)
	if err != nil {
		logrus.Error(err)
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &user, nil
}

func (h UserRetrieverServiceImpl) GetByEmail(ctx context.Context, email string) (*repository.User, error) {
	user, err := h.userRepository.Queries.GetUserByEmail(ctx, email)
	if err != nil {
		logrus.Error(err)
		return nil, errors.Wrapf(err, "could not get user with email: %s", email)
	}
	return &user, nil
}

func (h UserRetrieverServiceImpl) UserExists(ctx context.Context, username string) (*repository.UserExistsRow, error) {
	userExistsRow, err := h.userRepository.Queries.UserExists(ctx, username)
	if err != nil {
		logrus.Error(err)
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &userExistsRow, nil
}
