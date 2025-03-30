package handlers

import (
	repository "ztp/internal/repositories"
)

type Handlers struct {
	CreateUser CreateUser
}

func New(r *repository.Repository) Handlers {
	return Handlers{
		CreateUser: NewCreateUserHandler(r),
	}
}
