package document

import (
	"context"
	e "ztp/internal/error"
	"ztp/internal/repository"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

type DocumentDeleteServiceImpl struct {
	documentStore repository.Store
}

func NewDocumentDeleteService(r *repository.Repository) DocumentDeleteService {
	return &DocumentDeleteServiceImpl{
		documentStore: r.Queries,
	}
}

func (dds *DocumentDeleteServiceImpl) DeleteDocument(ctx context.Context, userId, documentId uuid.UUID) error {
	// First verify that the user owns this document
	ownsDocument, err := dds.documentStore.VerifyUserOwnsDocument(ctx, repository.VerifyUserOwnsDocumentParams{
		UserID:     userId,
		DocumentID: documentId,
	})
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(errors.Wrap(err, "could not verify document ownership"))
	}

	if !ownsDocument {
		return errors.New("user does not own this document")
	}

	// Delete document pages first (to avoid foreign key constraint violations)
	err = dds.documentStore.DeleteDocumentPages(ctx, documentId)
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(errors.Wrap(err, "could not delete document pages"))
	}

	// Delete the user-document relationship
	err = dds.documentStore.DeleteUserDocument(ctx, repository.DeleteUserDocumentParams{
		UserID:     userId,
		DocumentID: documentId,
	})
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(errors.Wrap(err, "could not delete user document relationship"))
	}

	// Finally delete the document itself
	err = dds.documentStore.DeleteDocument(ctx, documentId)
	if err != nil {
		logrus.Error(err)
		return e.HandleDbError(errors.Wrap(err, "could not delete document"))
	}

	return nil
}
