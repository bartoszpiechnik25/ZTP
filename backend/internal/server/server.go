package server

import (
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/jackc/pgx/v5/pgxpool"
	"ztp/internal/config"
	"ztp/internal/handlers"
	repository "ztp/internal/repositories"
)

type Server struct {
	Router     *chi.Mux
	handlers   handlers.Handlers
	repository *repository.Repository
}

func New(config *config.Config, pool *pgxpool.Pool) *Server {
	router := chi.NewMux()
	repo := repository.New(config.DbConfig, pool)
	handlers := handlers.New(repo)

	router.Use(middleware.Timeout(time.Duration(config.ServerConfig.Timeout) * time.Second))
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.RequestID)
	router.Use(render.SetContentType(render.ContentTypeJSON))
	return &Server{
		Router:     router,
		repository: repo,
		handlers:   handlers,
	}
}

func (s *Server) ConfigureHandlers() {
	s.Router.Post("/user/create", s.handlers.HandleCreateUser)
	s.Router.Get("/user/{username}", s.handlers.HandleGetUserByUsername)
	s.Router.Get("/user", s.handlers.HandleGetUserByEmail)
}
