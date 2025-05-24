package user

import (
	"net/http"
	e "ztp/internal/error"
	"ztp/internal/models"
	repository "ztp/internal/repositories"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type UserService struct {
	createUser       UserCreateService
	authenticateUser UserAuthenticationService
	getUser          UserRetrieverService
}

func NewUserService(r *repository.Repository) *UserService {
	return &UserService{
		createUser:       NewUserCreateService(r),
		getUser:          NewUserRetriver(r),
		authenticateUser: NewUserAuthenticationService(r),
	}
}

func (h *UserService) HandleCreateUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	params, err := models.MapRequestBody[models.CreateUserRequest](r.Body)
	if err != nil {
		e.HandleAPIError(err, "invalid request data", w, r)
		return
	}
	err = h.createUser.CreateUser(ctx, params)
	if err != nil {
		e.HandleAPIError(err, "could not create user", w, r)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (h *UserService) HandleGetByUsername(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user_email := chi.URLParam(r, "username")
	if user_email == "" {
		e.HandleAPIError(e.ErrIncompleteRequestData, "invalid request data", w, r)
		return
	}
	user, err := h.getUser.GetByUsername(ctx, user_email)
	if err != nil {
		e.HandleAPIError(err, "error retrieving user", w, r)
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *UserService) HandleGetByEmail(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.GetUserByEmailRequest](r.Body)
	if err != nil {
		e.HandleAPIError(err, "invalid request data", w, r)
		return
	}
	user, err := h.getUser.GetByEmail(ctx, request.Email)
	if err != nil {
		e.HandleAPIError(err, "error retrieving user", w, r)
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *UserService) HandleLogin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.LoginRequest](r.Body)
	if err != nil {
		e.HandleAPIError(err, "invalid request data", w, r)
		return
	}
	err = h.authenticateUser.Login(ctx, request)
	if err != nil {
		e.HandleAPIError(err, "error trying to authenticate user", w, r)
		return
	}
	w.WriteHeader(http.StatusOK)
}
