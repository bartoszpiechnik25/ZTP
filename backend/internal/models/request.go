package models

type GetUserByEmailRequest struct {
	Email string `json:"email" validate:"email,required"`
}

type GetUserByUsername struct {
	Username string `json:"username" validate:"required"`
}
