package auth

import (
	"context"
	"testing"
	e "ztp/internal/error"
	"ztp/internal/mock"
	"ztp/internal/models"
	repository "ztp/internal/repository"
	"ztp/internal/utils"

	"github.com/go-chi/jwtauth/v5"
	"github.com/stretchr/testify/require"
)

var testingJWT *jwtauth.JWTAuth

func Test_AuthenticationService(t *testing.T) {
	testingJWT = jwtauth.New("HS256", []byte("testing"), nil)
	t.Parallel()
	t.Run("should authenticate user and generate JWT token", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewUserAuthenticationService(&repo, testingJWT)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		password := "super_hard_password"
		encodedPassword, err := utils.HashPassword(password)

		require.NoError(t, err)
		user := repository.User{
			Username: "testing",
			Password: *encodedPassword,
		}
		mocks.StoreMock.EXPECT().GetUserByUsername(ctx, user.Username).Return(user, nil)

		// when
		token, err := service.Login(ctx, &models.LoginRequest{
			Username: user.Username,
			Password: password,
		})

		// then
		require.NoError(t, err)
		require.NotNil(t, token)
	})
	t.Run("should fail when invalid password", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewUserAuthenticationService(&repo, testingJWT)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		password := "super_hard_password"
		encodedPassword, err := utils.HashPassword(password)

		require.NoError(t, err)
		user := repository.User{
			Username: "testing",
			Password: *encodedPassword,
		}
		mocks.StoreMock.EXPECT().GetUserByUsername(ctx, user.Username).Return(user, nil)

		// when
		token, err := service.Login(ctx, &models.LoginRequest{
			Username: user.Username,
			Password: "user_sent_invalid_password",
		})

		// then
		require.Error(t, err)
		require.Nil(t, token)
	})
	t.Run("should fail when user not found", func(t *testing.T) {
		t.Parallel()
		mocks := mock.InitializeMocks(t)
		repo := repository.Repository{
			Queries: mocks.StoreMock,
		}
		service := NewUserAuthenticationService(&repo, testingJWT)
		t.Cleanup(mocks.Cleanup())

		// given
		ctx := context.Background()
		password := "super_hard_password"
		username := "some_user"
		var user repository.User

		mocks.StoreMock.EXPECT().GetUserByUsername(ctx, username).Return(user, e.ErrNotFound)

		// when
		token, err := service.Login(ctx, &models.LoginRequest{
			Username: username,
			Password: password,
		})

		// then
		require.Error(t, err)
		require.Nil(t, token)
	})
}
