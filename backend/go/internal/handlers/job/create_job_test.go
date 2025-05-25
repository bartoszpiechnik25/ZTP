package job

import (
	"context"
	"testing"
	"ztp/internal/domain"
	"ztp/internal/mock"
	"ztp/internal/repository"

	"github.com/golang/mock/gomock"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/require"
)

func Test_CreateJobService(t *testing.T) {
	t.Parallel()
	t.Run("should create job", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewJobCreateService(&repo)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		mocks.StoreMock.EXPECT().CreateJob(ctx, gomock.Any()).Return(nil)

		// when
		job_id, err := service.CreateJob(ctx, domain.JobStatusCreated, uuid.New())

		// then
		require.NoError(t, err)
		require.NotNil(t, job_id)
	})

	t.Run("should fail when insert fails", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewJobCreateService(&repo)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		mocks.StoreMock.EXPECT().CreateJob(ctx, gomock.Any()).Return(errors.New("some db error"))

		// when
		job_id, err := service.CreateJob(ctx, domain.JobStatusCreated, uuid.New())

		// then
		require.Error(t, err)
		require.NotNil(t, job_id)
	})
}
