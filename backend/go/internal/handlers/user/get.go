package user

import (
	"context"
	db "ztp/internal/repositories/sqlc"

	repository "ztp/internal/repositories"

	"github.com/google/uuid"
	"github.com/pkg/errors"
)

type UserRetrieverServiceImpl struct {
	userRepository *repository.Repository
}

func NewUserRetriver(repo *repository.Repository) UserRetrieverServiceImpl {
	return UserRetrieverServiceImpl{
		userRepository: repo,
	}
}

func (h UserRetrieverServiceImpl) ById(ctx context.Context, user_id uuid.UUID) (*db.User, error) {
	user, err := h.userRepository.Queries.GetUserByID(ctx, user_id)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with id: %s", user_id.String())
	}
	return &user, nil
}

func (h UserRetrieverServiceImpl) GetByUsername(ctx context.Context, username string) (*db.User, error) {
	user, err := h.userRepository.Queries.GetUserByUsername(ctx, username)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &user, nil
}

func (h UserRetrieverServiceImpl) GetByEmail(ctx context.Context, email string) (*db.User, error) {
	user, err := h.userRepository.Queries.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with email: %s", email)
	}
	return &user, nil
}

func (h UserRetrieverServiceImpl) UserExists(ctx context.Context, username string) (*db.UserExistsRow, error) {
	userExistsRow, err := h.userRepository.Queries.UserExists(ctx, username)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &userExistsRow, nil
}
