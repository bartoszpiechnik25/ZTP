package handlers

import (
	"net/http"
	"ztp/internal/models"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"

	repository "ztp/internal/repositories"
)

type Handlers struct {
	createUser CreateUser
	getUser    GetUser
}

func New(r *repository.Repository) Handlers {
	return Handlers{
		createUser: NewCreateUserHandler(r),
		getUser:    NewGetUserHandler(r),
	}
}

func (h *Handlers) HandleCreateUser(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	params, err := models.MapRequestBody[models.CreateUserRequest](r.Body)
	if err != nil {
		_ = render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	err = h.createUser.Handle(ctx, params)
	if err != nil {
		_ = render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error creating user"))
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (h *Handlers) HandleGetUserByUsername(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user_email := chi.URLParam(r, "username")
	user, err := h.getUser.HandleByUsername(ctx, user_email)
	if err != nil {
		_ = render.Render(w, r, ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *Handlers) HandleGetUserByEmail(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.GetUserByEmailRequest](r.Body)
	if err != nil {
		_ = render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	user, err := h.getUser.HandleByEmail(ctx, request.Email)
	if err != nil {
		_ = render.Render(w, r, ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	_ = render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}
