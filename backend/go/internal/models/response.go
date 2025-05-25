package models

import "net/http"

type GetUserByIdResponse struct {
	*User
}

func (resp *GetUserByIdResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}
