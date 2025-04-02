package utils

import (
	"encoding/json"
	"net/http"
	"ztp/internal/models"

	"github.com/go-playground/validator/v10"
)

func MapRequestBodyToAddUserModel(r *http.Request) (*models.CreateUser, error) {
	validate := validator.New()
	var params models.CreateUser
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return nil, err
	}
	err = validate.Struct(params)
	if err != nil {
		return nil, err
	}
	return &params, nil
}
