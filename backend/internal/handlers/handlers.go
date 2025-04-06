package handlers

import (
	"net/http"
	"ztp/internal/models"
	repository "ztp/internal/repositories"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/google/uuid"
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
	params, err := models.MapRequestBodyToAddUserModel(r.Body)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	err = h.createUser.Handle(ctx, params)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error creating user"))
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (h *Handlers) HandleGetUserById(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	req_id := chi.URLParam(r, "user_id")

	user_id, err := uuid.Parse(req_id)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusBadRequest, "could not convert user_id to UUID"))
		return
	}
	user, err := h.getUser.HandleById(ctx, user_id)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *Handlers) HandleGetUserByEmail(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.GetUserByEmailRequest](r.Body)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	user, err := h.getUser.HandleByEmail(ctx, request.Email)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}

func (h *Handlers) HandleGetUserByUsername(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := models.MapRequestBody[models.GetUserByUsername](r.Body)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusBadRequest, "Error mapping request data"))
		return
	}
	user, err := h.getUser.HandleByUsername(ctx, request.Username)
	if err != nil {
		render.Render(w, r, ErrRender(err, http.StatusNotFound, "error retrieving user"))
		return
	}
	render.Render(w, r, models.MapUserToGetUserByIdResponse(user))
}
