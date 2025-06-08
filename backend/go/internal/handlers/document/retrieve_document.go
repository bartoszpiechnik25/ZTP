package document

import (
	"context"
	e "ztp/internal/error"
	"ztp/internal/repository"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

type DocumentRetrieverServiceImpl struct {
	documentStore repository.Store
}

func NewDocumentRetrieverService(r *repository.Repository) DocumentRetrieverService {
	return &DocumentRetrieverServiceImpl{
		documentStore: r.Queries,
	}
}

func (drs *DocumentRetrieverServiceImpl) GetDocumentTypes(ctx context.Context) ([]repository.DocumentType, error) {
	documentTypes, err := drs.documentStore.GetDocumentTypes(ctx)
	if err != nil {
		logrus.Error(err)
		return nil, e.HandleDbError(errors.Wrap(err, "could not get document types"))
	}
	return documentTypes, nil
}

func (drs *DocumentRetrieverServiceImpl) GetDocumentCategories(ctx context.Context) ([]repository.DocumentCategory, error) {
	documentCategories, err := drs.documentStore.GetDocumentCategories(ctx)
	if err != nil {
		logrus.Error(err)
		return nil, e.HandleDbError(errors.Wrap(err, "could not get document types"))
	}
	return documentCategories, nil
}

func (drs *DocumentRetrieverServiceImpl) GetAllUserDocuments(ctx context.Context, userId uuid.UUID) ([]repository.GetAllUserDocumentsRow, error) {
	documents, err := drs.documentStore.GetAllUserDocuments(ctx, userId)
	if err != nil {
		logrus.Error(err)
		return nil, e.HandleDbError(err)
	}
	return documents, nil
}
