package models

import (
	"encoding/json"
	"io"

	"github.com/go-playground/validator/v10"
	"ztp/internal/repositories/sqlc"
)

func MapRequestBody[T any](body io.ReadCloser) (*T, error) {
	validate := validator.New()
	var request T
	err := json.NewDecoder(body).Decode(&request)
	if err != nil {
		return nil, err
	}
	err = validate.Struct(request)
	if err != nil {
		return nil, err
	}
	return &request, nil
}

func MapUserToGetUserByIdResponse(user *db.User) *GetUserByIdResponse {
	return &GetUserByIdResponse{
		User: &User{
			Name:        user.Name,
			Surname:     user.Surname,
			PhoneNumber: user.PhoneNumber,
			Username:    user.Username,
			Email:       user.Email,
			Role:        UserRole(user.UserRole),
		},
	}
}
