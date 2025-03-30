package models

type UserRole string

const (
	UserRoleAdimn UserRole = "adimn"
	UserRoleUser  UserRole = "user"
)

type CreateUser struct {
	Name        *string  `json:"name"`
	Surname     *string  `json:"surname"`
	Username    string   `json:"username" validate:"required"`
	Email       string   `json:"email" validate:"required,email"`
	PhoneNumber string   `json:"phone_number" validate:"required"`
	Role        UserRole `json:"role" validate:"required"`
}
