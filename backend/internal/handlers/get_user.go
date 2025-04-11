package handlers

import (
	"context"
	repository "ztp/internal/repositories"
	sqlcrepositiories "ztp/internal/repositories/sqlc"

	"github.com/google/uuid"
	"github.com/pkg/errors"
)

type GetUser struct {
	getUserRepository *repository.Repository
}

func NewGetUserHandler(repo *repository.Repository) GetUser {
	return GetUser{
		getUserRepository: repo,
	}
}

func (h GetUser) HandleById(ctx context.Context, user_id uuid.UUID) (*sqlcrepositiories.User, error) {
	user, err := h.getUserRepository.Queries.GetUserByID(ctx, user_id)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with id: %s", user_id.String())
	}
	return &user, nil
}

func (h GetUser) HandleByUsername(ctx context.Context, username string) (*sqlcrepositiories.User, error) {
	user, err := h.getUserRepository.Queries.GetUserByUsername(ctx, username)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with username: %s", username)
	}
	return &user, nil
}

func (h GetUser) HandleByEmail(ctx context.Context, email string) (*sqlcrepositiories.User, error) {
	user, err := h.getUserRepository.Queries.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, errors.Wrapf(err, "could not get user with email: %s", email)
	}
	return &user, nil
}
