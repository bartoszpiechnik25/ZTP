package errors

import (
	"errors"
	"net/http"

	"github.com/go-chi/render"
)

type ErrorResponse struct {
	Err            error `json:"-"`
	HTTPStatusCode int   `json:"-"`

	Message   string `json:"message"`
	AppCode   int64  `json:"code,omitempty"`
	ErrorText string `json:"error,omitempty"`
}

func (e *ErrorResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

func ErrRender(err error, code int, message string) render.Renderer {
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: code,
		Message:        message,
		ErrorText:      err.Error(),
	}
}

func HandleAPIError(err error, message string, w http.ResponseWriter, r *http.Request) {
	var statusCode int
	if errors.Is(err, ErrInvalidPassword) {
		statusCode = http.StatusUnauthorized
	} else if errors.Is(err, ErrIncompleteRequestData) {
		statusCode = http.StatusBadRequest
	} else if errors.Is(err, ErrNotFound) {
		statusCode = http.StatusNotFound
	} else if errors.Is(err, ErrAlreadyExsits) {
		statusCode = http.StatusConflict
	} else {
		statusCode = http.StatusInternalServerError
	}
	_ = render.Render(w, r, ErrRender(err, statusCode, message))
}
