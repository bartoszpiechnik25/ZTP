package user

import (
	"net/http"
	e "ztp/internal/error"
	"ztp/internal/models"
	repository "ztp/internal/repositories"
	"ztp/internal/utils"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type User struct {
	createUser CreateUser
	getUser    GetUser
}

func New(r *repository.Repository) User {
	return User{
		createUser: NewCreateUserHandler(r),
		getUser:    NewGetUserHandler(r),
	}
}

func (h *User) HandleCreate(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	params, err := models.MapRequestBody[models.CreateUserRequest](r.Body)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	err = h.createUser.Handle(ctx, params)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusBadRequest, "Error creating user"))
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (h *User) HandleGetByUsername(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user_email := chi.URLParam(r, "username")
	user, err := h.getUser.ByUsername(ctx, user_email)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *User) HandleGetByEmail(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.GetUserByEmailRequest](r.Body)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	user, err := h.getUser.ByEmail(ctx, request.Email)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *User) HandleLogin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.LoginRequest](r.Body)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	user, err := h.getUser.ByUsername(ctx, request.Username)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	err = utils.ValidPasswordHash(user.Password, request.Password)
	if err != nil {
		_ = render.Render(w, r, e.ErrRender(err, http.StatusUnauthorized, "invalid password"))
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}
