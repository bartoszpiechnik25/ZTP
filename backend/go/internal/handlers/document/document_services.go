package document

import (
	"context"
	"ztp/internal/models"
	"ztp/internal/repository"

	"github.com/google/uuid"
)

type DocumentCreateService interface {
	CreateDocument(ctx context.Context, params *models.CreateDocumentRequest, userID uuid.UUID) error
}

type DocumentRetrieverService interface {
	GetDocumentTypes(ctx context.Context) ([]repository.DocumentType, error)
	GetDocumentCategories(ctx context.Context) ([]repository.DocumentCategory, error)
	GetAllUserDocuments(ctx context.Context, userId uuid.UUID) ([]repository.GetAllUserDocumentsRow, error)
	GetDocumentById(ctx context.Context, userId, documentId uuid.UUID) (*repository.GetDocumentByIdRow, error)
}

type DocumentDeleteService interface {
	DeleteDocument(ctx context.Context, userId, documentId uuid.UUID) error
}
