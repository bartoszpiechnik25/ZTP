package utils

import (
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (*string, error) {
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

func ResponseError(errCode int, err error, body map[string]any) {
}

func ResponseSuccess(status int, body map[string]any) {
}

func ValidationErrToJson(err validator.ValidationErrors) {
}
