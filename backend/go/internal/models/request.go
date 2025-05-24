package models

type GetUserByEmailRequest struct {
	Email string `json:"email" validate:"email,required"`
}

type CreateUserRequest struct {
	Name        *string  `json:"name"`
	Surname     *string  `json:"surname"`
	Username    string   `json:"username"     validate:"required"`
	Password    string   `json:"password"     validate:"required"`
	Email       string   `json:"email"        validate:"required,email"`
	PhoneNumber string   `json:"phone_number" validate:"required"`
	Role        UserRole `json:"role"         validate:"required,oneof=admin user"`
}

type LoginRequest struct {
	Username string `json:"username"     validate:"required"`
	Password string `json:"password"     validate:"required"`
}
