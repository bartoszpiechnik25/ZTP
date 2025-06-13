package document

import (
	"net/http"
	"ztp/internal/models"
	"ztp/internal/repository"
	"ztp/internal/utils"

	e "ztp/internal/error"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
)

type DocumentService struct {
	createDocument    DocumentCreateService
	retrieveDocuments DocumentRetrieverService
	deleteDocument    DocumentDeleteService
}

func New(r *repository.Repository) *DocumentService {
	return &DocumentService{
		createDocument:    NewCreateDocumentService(r),
		retrieveDocuments: NewDocumentRetrieverService(r),
		deleteDocument:    NewDocumentDeleteService(r),
	}
}

func (ds *DocumentService) HandleCreateDocument(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Starting create document handler")
	ctx := r.Context()
	userId, err := utils.UserIdFromContext(ctx)
	if err != nil {
		e.HandleAPIError(err, "could not extract user claims", w, r)
		return
	}
	params, err := models.MapRequestBody[models.CreateDocumentRequest](r.Body)
	if err != nil {
		e.HandleAPIError(err, "invalid request data", w, r)
		return
	}
	err = ds.createDocument.CreateDocument(ctx, params, *userId)
	if err != nil {
		e.HandleAPIError(err, "could not create document", w, r)
		return
	}
	logrus.Info("Document successfully created")
	w.WriteHeader(http.StatusCreated)
}

func (ds *DocumentService) HandleGetDocumentTypes(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Starting retrieve document types handler")
	ctx := r.Context()
	documentTypes, err := ds.retrieveDocuments.GetDocumentTypes(ctx)
	if err != nil {
		e.HandleAPIError(err, "could note get document types", w, r)
		return
	}
	_ = render.Render(w, r, models.MapToGetDocumentTypesResponse(documentTypes))
	logrus.Info("Document types retrieved successfully")
}

func (ds *DocumentService) HandleGetDocumentCategories(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Starting retrieve document categories handler")
	ctx := r.Context()
	documentCategories, err := ds.retrieveDocuments.GetDocumentCategories(ctx)
	if err != nil {
		e.HandleAPIError(err, "could note get document categories", w, r)
		return
	}
	_ = render.Render(w, r, models.MapToGetDocumentCategoriesResponse(documentCategories))
	logrus.Info("Document categories retrieved successfully")
}

func (ds *DocumentService) HandleGetAllUserDocuments(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Starting get all user documents handler")
	ctx := r.Context()
	userId, err := utils.UserIdFromContext(ctx)
	if err != nil {
		e.HandleAPIError(err, "failed to obtain user id", w, r)
		return
	}
	documents, err := ds.retrieveDocuments.GetAllUserDocuments(ctx, *userId)
	if err != nil {
		e.HandleAPIError(err, "could not retrieve user documents", w, r)
		return
	}
	_ = render.Render(w, r, models.MapToGetAllUserDocumentsResponse(documents))
	logrus.Info("User documents retrieved")
}

func (ds *DocumentService) HandleGetDocumentById(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Starting get document by id handler")
	ctx := r.Context()

	// Get user ID from context
	userId, err := utils.UserIdFromContext(ctx)
	if err != nil {
		e.HandleAPIError(err, "failed to obtain user id", w, r)
		return
	}

	// Get document ID from URL parameter
	documentIdStr := chi.URLParam(r, "id")
	documentId, err := uuid.Parse(documentIdStr)
	if err != nil {
		e.HandleAPIError(err, "invalid document id", w, r)
		return
	}

	document, err := ds.retrieveDocuments.GetDocumentById(ctx, *userId, documentId)
	if err != nil {
		e.HandleAPIError(err, "could not retrieve document", w, r)
		return
	}

	_ = render.Render(w, r, models.MapToGetDocumentByIdResponse(*document))
	logrus.Info("Document retrieved successfully")
}

func (ds *DocumentService) HandleDeleteDocument(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Starting delete document handler")
	ctx := r.Context()

	// Get user ID from context
	userId, err := utils.UserIdFromContext(ctx)
	if err != nil {
		e.HandleAPIError(err, "failed to obtain user id", w, r)
		return
	}

	// Get document ID from URL parameter
	documentIdStr := chi.URLParam(r, "id")
	documentId, err := uuid.Parse(documentIdStr)
	if err != nil {
		e.HandleAPIError(err, "invalid document id", w, r)
		return
	}

	err = ds.deleteDocument.DeleteDocument(ctx, *userId, documentId)
	if err != nil {
		e.HandleAPIError(err, "could not delete document", w, r)
		return
	}

	w.WriteHeader(http.StatusNoContent)
	logrus.Info("Document deleted successfully")
}
