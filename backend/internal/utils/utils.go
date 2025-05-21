package utils

import "github.com/go-playground/validator/v10"

func ResponseError(errCode int, err error, body map[string]any) {
}

func ResponseSuccess(status int, body map[string]any) {
}

func ValidationErrToJson(err validator.ValidationErrors) {
}
