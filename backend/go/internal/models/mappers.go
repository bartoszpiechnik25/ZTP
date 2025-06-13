package models

import (
	"encoding/json"
	"io"
	"ztp/internal/repository"

	"github.com/go-playground/validator/v10"
)

func MapRequestBody[T any](body io.ReadCloser) (*T, error) {
	validate := validator.New()
	var request T
	err := json.NewDecoder(body).Decode(&request)
	if err != nil {
		return nil, err
	}
	err = validate.Struct(request)
	if err != nil {
		return nil, err
	}
	return &request, nil
}

func MapUserToGetUserByIdResponse(user *repository.User) *GetUserByIdResponse {
	return &GetUserByIdResponse{
		User: &User{
			Name:        user.Name,
			Surname:     user.Surname,
			PhoneNumber: user.PhoneNumber,
			Username:    user.Username,
			Email:       user.Email,
			Role:        UserRole(user.UserRole),
		},
	}
}

func MapToGetDocumentTypesResponse(documentTypes []repository.DocumentType) *GetDocumentTypesResponse {
	return &GetDocumentTypesResponse{
		Types: documentTypes,
	}
}

func MapToGetDocumentCategoriesResponse(documentCategories []repository.DocumentCategory) *GetDocumentCategoriesResponse {
	return &GetDocumentCategoriesResponse{
		Categories: documentCategories,
	}
}

func MapToGetAllUserDocumentsResponse(documents []repository.GetAllUserDocumentsRow) *GetAllUserDocumentsResponse {
	return &GetAllUserDocumentsResponse{
		Documents: documents,
	}
}

func MapToGetDocumentByIdResponse(document repository.GetDocumentByIdRow) *GetDocumentByIdResponse {
	return &GetDocumentByIdResponse{
		Document: &DocumentDetail{
			ID:       document.ID.String(),
			Title:    document.Title,
			Notes:    document.Notes,
			Category: document.Category,
			Type:     document.Type,
		},
	}
}
