package repository

import (
	"context"
	"ztp/internal/config"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Store interface {
	CreateJob(ctx context.Context, arg CreateJobParams) error
	AddUser(ctx context.Context, arg AddUserParams) error
	GetUserByUsername(ctx context.Context, username string) (User, error)
	GetUserByID(ctx context.Context, user_id uuid.UUID) (User, error)
	GetUserByEmail(ctx context.Context, email string) (User, error)
	UserExists(ctx context.Context, username string) (UserExistsRow, error)
	CreateDocument(ctx context.Context, arg CreateDocumentParams) error
	CreateDocumentPage(ctx context.Context, arg CreateDocumentPageParams) error
	GetDocumentCategory(ctx context.Context, name string) (DocumentCategory, error)
	GetDocumentType(ctx context.Context, name string) (DocumentType, error)
	GetDocumentTypes(ctx context.Context) ([]DocumentType, error)
	GetDocumentCategories(ctx context.Context) ([]DocumentCategory, error)
	CreateUserDocument(ctx context.Context, params CreateUserDocumentParams) error
	GetAllUserDocuments(ctx context.Context, userID uuid.UUID) ([]GetAllUserDocumentsRow, error)
	GetDocumentById(ctx context.Context, id uuid.UUID) (GetDocumentByIdRow, error)
	GetDocumentWithPages(ctx context.Context, id uuid.UUID) (GetDocumentWithPagesRow, error)
	GetDocumentPages(ctx context.Context, documentID uuid.UUID) ([]DocumentPage, error)
	DeleteDocument(ctx context.Context, id uuid.UUID) error
	DeleteDocumentPages(ctx context.Context, documentID uuid.UUID) error
	DeleteUserDocument(ctx context.Context, arg DeleteUserDocumentParams) error
	VerifyUserOwnsDocument(ctx context.Context, arg VerifyUserOwnsDocumentParams) (bool, error)
}

type Repository struct {
	Queries Store
}

func NewRepository(c *config.DbConfig, postgres *pgxpool.Pool) *Repository {
	return &Repository{
		Queries: New(postgres),
	}
}
