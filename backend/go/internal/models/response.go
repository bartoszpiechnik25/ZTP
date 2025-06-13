package models

import (
	"net/http"
	"ztp/internal/repository"
)

type GetUserByIdResponse struct {
	*User
}

func (resp *GetUserByIdResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

type LoginResponse struct {
	Token string `json:"token"`
}

func (resp *LoginResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

type GetDocumentCategoriesResponse struct {
	Categories []repository.DocumentCategory `json:"categories"`
}

func (resp *GetDocumentCategoriesResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

type GetDocumentTypesResponse struct {
	Types []repository.DocumentType `json:"types"`
}

func (resp *GetDocumentTypesResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

type GetAllUserDocumentsResponse struct {
	Documents []repository.GetAllUserDocumentsRow `json:"documents"`
}

func (resp *GetAllUserDocumentsResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

type DocumentDetail struct {
	ID       string  `json:"id"`
	Title    *string `json:"title"`
	Notes    *string `json:"notes"`
	Category string  `json:"category"`
	Type     string  `json:"type"`
}

type GetDocumentByIdResponse struct {
	Document *DocumentDetail `json:"document"`
}

func (resp *GetDocumentByIdResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}
