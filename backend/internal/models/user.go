package models

type UserRole string

const (
	UserRoleAdimn UserRole = "admin"
	UserRoleUser  UserRole = "user"
)

type User struct {
	Name        *string  `json:"name,omitempty"`
	Surname     *string  `json:"surname,omitempty"`
	Username    string   `json:"username" validate:"required"`
	Email       string   `json:"email" validate:"required,email"`
	PhoneNumber string   `json:"phone_number" validate:"required"`
	Role        UserRole `json:"role" validate:"required,oneof=admin user"`
}
