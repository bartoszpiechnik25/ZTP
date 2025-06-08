package utils

import (
	"context"
	e "ztp/internal/error"

	"github.com/go-chi/jwtauth/v5"
	"github.com/google/uuid"
	"github.com/pkg/errors"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (*string, error) {
	if password == "" {
		return nil, errors.Wrap(e.ErrIncompleteRequestData, "empty password")
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return ToPtr(string(hashed)), nil
}

func ValidPasswordHash(passwordHash, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))
}

func ToPtr(value string) *string {
	if value != "" {
		return &value
	}
	return nil
}

func UserIdFromContext(ctx context.Context) (*uuid.UUID, error) {
	_, claims, err := jwtauth.FromContext(ctx)
	if err != nil {
		return nil, errors.Wrap(e.ErrUnauthorized, "could not extract claims from context")
	}
	userId, ok := claims["user_id"].(string)
	if !ok {
		return nil, errors.Wrap(e.ErrForbidden, "could not extract user id")
	}
	userUuid := uuid.MustParse(userId)
	return &userUuid, nil
}
