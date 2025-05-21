package user

import (
	"context"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	repository "ztp/internal/repositories"
	"ztp/internal/repositories/sqlc"
)

type GetUser struct {
	userRepository *repository.Repository
}

func NewGetUserHandler(repo *repository.Repository) GetUser {
	return GetUser{
		userRepository: repo,
	}
}

func (h GetUser) ById(ctx context.Context, user_id uuid.UUID) (*db.User, error) {
	user, err := h.userRepository.Queries.GetUserByID(ctx, user_id)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with id: %s", user_id.String())
	}
	return &user, nil
}

func (h GetUser) ByUsername(ctx context.Context, username string) (*db.User, error) {
	user, err := h.userRepository.Queries.GetUserByUsername(ctx, username)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &user, nil
}

func (h GetUser) ByEmail(ctx context.Context, email string) (*db.User, error) {
	user, err := h.userRepository.Queries.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with email: %s", email)
	}
	return &user, nil
}

func (h GetUser) UserExists(ctx context.Context, username string) (*db.UserExistsRow, error) {
	userExistsRow, err := h.userRepository.Queries.UserExists(ctx, username)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &userExistsRow, nil
}
