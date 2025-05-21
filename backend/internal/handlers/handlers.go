package handlers

import (
	userHandler "ztp/internal/handlers/user"
	repository "ztp/internal/repositories"
)

type Handlers struct {
	Users userHandler.User
}

func New(r *repository.Repository) Handlers {
	return Handlers{
		Users: userHandler.New(r),
	}
}
