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

type CreateDocumentRequest struct {
	Title            string         `json:"title" validate:"required"`
	Notes            *string        `json:"notes"`
	DocumentType     string         `json:"document_type" validate:"required"`
	DocumentCategory string         `json:"document_category" validate:"required"`
	DocumentPages    []DocumentPage `json:"document_pages" validate:"required"`
}

type DocumentPage struct {
	PageNumber      uint16  `json:"page_number" validate:"required"`
	ContentType     *string `json:"content_type"`
	DocumentContent []byte  `json:"document_content" validate:"required"`
}
