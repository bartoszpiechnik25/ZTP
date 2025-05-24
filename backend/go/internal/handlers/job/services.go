package job

import (
	"context"
	"ztp/internal/domain"

	"github.com/google/uuid"
)

type JobCreateService interface {
	CreateJob(ctx context.Context, jobStatus domain.JobStatus, document_id uuid.UUID) (uuid.UUID, error)
}
