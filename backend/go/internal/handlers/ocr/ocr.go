package ocr

import (
	"context"
	"net/http"
	"ztp/internal/domain"
	e "ztp/internal/error"
	document_ml "ztp/internal/grpc"
	"ztp/internal/handlers/job"
	repository "ztp/internal/repository"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type OcrService interface {
	DetectDocumentText(ctx context.Context, document_id, job_id uuid.UUID) error
}

type OcrServiceImpl struct {
	ocrGrpc    OcrService
	jobService job.JobCreateService
}

func NewOcrService(repo *repository.Repository) *OcrServiceImpl {
	return &OcrServiceImpl{
		ocrGrpc:    document_ml.NewOcrService(),
		jobService: job.NewJobCreateService(repo),
	}
}

func (o *OcrServiceImpl) HandleDetectDocumentText(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	document_id, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		e.HandleAPIError(err, "invalid document identifier", w, r)
		return
	}
	job_id, err := o.jobService.CreateJob(ctx, domain.JobStatusCreated, document_id)
	if err != nil {
		e.HandleAPIError(err, "could not schedule job", w, r)
		return
	}
	err = o.ocrGrpc.DetectDocumentText(ctx, document_id, job_id)
	if err != nil {
		e.HandleAPIError(err, "failed to schedule detect document text", w, r)
		return
	}
	w.WriteHeader(http.StatusOK)
}
