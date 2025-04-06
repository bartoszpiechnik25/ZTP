package utils

import (
	"encoding/json"
	"io"
	"ztp/internal/models"

	"github.com/go-playground/validator/v10"
)

func MapRequestBodyToAddUserModel(body io.ReadCloser) (*models.CreateUser, error) {
	validate := validator.New()
	var params models.CreateUser
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
