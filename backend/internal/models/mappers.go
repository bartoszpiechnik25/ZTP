package models

import (
	"encoding/json"
	"io"
	sqlcrepositiories "ztp/internal/repositories/sqlc"

	"github.com/go-playground/validator/v10"
)

func MapRequestBodyToAddUserModel(body io.ReadCloser) (*CreateUser, error) {
	validate := validator.New()
	var params CreateUser
	err := json.NewDecoder(body).Decode(&params)
	if err != nil {
		return nil, err
	}
	err = validate.Struct(params)
	if err != nil {
		return nil, err
	}
	return &params, nil
}

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

func MapUserToGetUserByIdResponse(user *sqlcrepositiories.User) *GetUserByIdResponse {
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
