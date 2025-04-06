package handlers

import (
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
