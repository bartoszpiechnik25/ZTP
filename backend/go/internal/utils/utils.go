package utils

import (
	e "ztp/internal/error"

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
