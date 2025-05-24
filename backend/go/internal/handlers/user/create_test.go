package user

import (
	"context"
	"testing"
	"ztp/internal/mock"
	"ztp/internal/models"
	repository "ztp/internal/repositories"
	"ztp/internal/utils"

	"github.com/golang/mock/gomock"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/require"
)

func Test_UserCreateService(t *testing.T) {
	t.Parallel()
	request := &models.CreateUserRequest{
		Name:        utils.ToPtr("john"),
		Surname:     utils.ToPtr("doe"),
		Email:       "john_doe@gmail.com",
		Password:    "some weak passwd",
		PhoneNumber: "+48657234901",
		Username:    "john_doe_69",
		Role:        "user",
	}

	t.Run("should create user", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewUserCreateService(&repo)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		mocks.StoreMock.EXPECT().AddUser(ctx, gomock.Any()).Return(nil)

		// when
		err := service.CreateUser(ctx, request)

		// then
		require.NoError(t, err)
	})

	t.Run("should fail when user exists", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewUserCreateService(&repo)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		mocks.StoreMock.EXPECT().AddUser(ctx, gomock.Any()).Return(errors.New("insert violates UNIQUE constraint"))

		// when
		err := service.CreateUser(ctx, request)

		// then
		require.Error(t, err)
	})

	t.Run("should fail when password is empty", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewUserCreateService(&repo)
		t.Cleanup(mocks.Cleanup())

		// given
		req := &models.CreateUserRequest{}
		ctx := context.Background()

		// when
		err := service.CreateUser(ctx, req)

		// then
		require.Error(t, err)
	})
}
