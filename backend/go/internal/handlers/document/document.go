package document

import (
	"net/http"
	"ztp/internal/models"
	"ztp/internal/repository"
	"ztp/internal/utils"

	e "ztp/internal/error"

	"github.com/go-chi/render"
	"github.com/sirupsen/logrus"
)

type DocumentService struct {
	createDocument    DocumentCreateService
	retrieveDocuments DocumentRetrieverService
}

func New(r *repository.Repository) *DocumentService {
	return &DocumentService{
		createDocument:    NewCreateDocumentService(r),
		retrieveDocuments: NewDocumentRetrieverService(r),
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
		e.HandleDbError(err)
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
		e.HandleDbError(err)
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
