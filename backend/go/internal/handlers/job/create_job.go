package job

import (
	"context"
	"time"
	"ztp/internal/domain"
	e "ztp/internal/error"
	repository "ztp/internal/repository"
	"ztp/internal/utils"

	"github.com/google/uuid"
)

type JobCreateServiceImpl struct {
	jobsStore repository.Store
}

func NewJobCreateService(repo *repository.Repository) JobCreateServiceImpl {
	return JobCreateServiceImpl{
		jobsStore: repo.Queries,
	}
}

func (j JobCreateServiceImpl) CreateJob(ctx context.Context, jobStatus domain.JobStatus, document_id uuid.UUID) (uuid.UUID, error) {
	job_id := uuid.New()
	started_at := time.Now()

	err := j.jobsStore.CreateJob(ctx, repository.CreateJobParams{
		DocumentID: document_id,
		ID:         job_id,
		Status:     utils.ToPtr(jobStatus.String()),
		StartedAt:  started_at,
	})
	return job_id, e.HandleDbError(err)
}
