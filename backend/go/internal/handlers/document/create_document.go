package document

import (
	"context"
	"ztp/internal/models"
	"ztp/internal/repository"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"

	e "ztp/internal/error"
)

type DocumentCreateServiceImpl struct {
	documentStore repository.Store
}

func NewCreateDocumentService(repo *repository.Repository) DocumentCreateService {
	return &DocumentCreateServiceImpl{
		documentStore: repo.Queries,
	}
}

func (ds *DocumentCreateServiceImpl) CreateDocument(ctx context.Context, params *models.CreateDocumentRequest, userId uuid.UUID) error {
	documentID := uuid.New()

	documentCategoryID, err := ds.getDocumentCategoryID(ctx, params.DocumentCategory)
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(err)
	}

	documentTypeID, err := ds.getDocumentTypeID(ctx, params.DocumentType)
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(err)
	}
	documentParams := repository.CreateDocumentParams{
		ID:                 documentID,
		Title:              &params.Title,
		Notes:              params.Notes,
		DocumentTypeID:     *documentTypeID,
		DocumentCategoryID: *documentCategoryID,
	}

	err = ds.documentStore.CreateDocument(ctx, documentParams)
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(err)
	}

	err = ds.insertDocumentPages(ctx, documentID, params.DocumentPages)
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(err)
	}

	err = ds.documentStore.CreateUserDocument(ctx, repository.CreateUserDocumentParams{
		UserID:     userId,
		DocumentID: documentID,
	})
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(err)
	}

	return nil
}

func (ds *DocumentCreateServiceImpl) insertDocumentPages(ctx context.Context, documentID uuid.UUID, documentPages []models.DocumentPage) error {
	for i, documentPage := range documentPages {
		documentPageID := uuid.New()
		args := repository.CreateDocumentPageParams{
			ID:          documentPageID,
			PageNumber:  int16(documentPage.PageNumber),
			ContentType: documentPage.ContentType,
			Data:        documentPage.DocumentContent,
			OcrContent:  nil,
			DocumentID:  documentID,
		}
		err := ds.documentStore.CreateDocumentPage(ctx, args)
		if err != nil {
			return errors.Wrapf(err, "could not insert page %d for document with ID: %s", i+1, documentID.String())
		}
	}
	return nil
}

func (ds *DocumentCreateServiceImpl) getDocumentTypeID(ctx context.Context, docType string) (*uuid.UUID, error) {
	docT, err := ds.documentStore.GetDocumentType(ctx, docType)
	if err != nil {
		return nil, errors.Wrap(err, "could not get document type id")
	}
	return &docT.ID, nil
}

func (ds *DocumentCreateServiceImpl) getDocumentCategoryID(ctx context.Context, category string) (*uuid.UUID, error) {
	docCategory, err := ds.documentStore.GetDocumentCategory(ctx, category)
	if err != nil {
		return nil, errors.Wrap(err, "could not get document category id")
	}
	return &docCategory.ID, nil
}
