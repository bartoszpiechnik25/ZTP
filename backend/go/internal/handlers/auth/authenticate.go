package auth

import (
	"context"
	"time"
	"ztp/internal/models"
	repository "ztp/internal/repository"
	"ztp/internal/utils"

	e "ztp/internal/error"

	"github.com/go-chi/jwtauth/v5"

	"github.com/pkg/errors"
)

type UserAutenthicationServiceImpl struct {
	repository repository.Store
	TokenAuth  *jwtauth.JWTAuth
}

func NewUserAuthenticationService(repo *repository.Repository, auth *jwtauth.JWTAuth) UserAutenthicationServiceImpl {
	return UserAutenthicationServiceImpl{
		repository: repo.Queries,
		TokenAuth:  auth,
	}
}

func (u UserAutenthicationServiceImpl) Login(ctx context.Context, request *models.LoginRequest) (*string, error) {
	user, err := u.repository.GetUserByUsername(ctx, request.Username)
	if err != nil {
		return nil, e.HandleDbError(err)
		// return nil, errors.Wrapf(err, "could not retrieve user with username: %s", request.Username)
	}
	err = utils.ValidPasswordHash(user.Password, request.Password)
	if err != nil {
		return nil, errors.Wrapf(e.ErrInvalidPassword, "invalid password for user with username: %s", user.Username)
	}
	_, token, err := u.TokenAuth.Encode(claimsFromUser(user))
	if err != nil {
		return nil, errors.Wrap(err, "could not generate JWT token")
	}
	return utils.ToPtr(token), nil
}

func claimsFromUser(user repository.User) map[string]any {
	now := time.Now()
	return map[string]any{
		"user_id": user.ID.String(),
		"role":    string(user.UserRole),
		"exp":     now.Add(12 * time.Hour).Unix(),
		"iat":     now.Unix(),
		"nbf":     now.Unix(),
	}
}
