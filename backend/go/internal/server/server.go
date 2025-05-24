package server

import (
	"time"
	"ztp/internal/config"
	"ztp/internal/handlers/user"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/jackc/pgx/v5/pgxpool"

	repository "ztp/internal/repositories"
)

type Server struct {
	Router     *chi.Mux
	users      *user.UserService
	repository *repository.Repository
}

func New(config *config.Config, pool *pgxpool.Pool) *Server {
	router := chi.NewMux()
	repo := repository.New(config.DbConfig, pool)
	handlers := user.NewUserService(repo)

	router.Use(middleware.Timeout(time.Duration(config.ServerConfig.Timeout) * time.Second))
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.RequestID)
	router.Use(render.SetContentType(render.ContentTypeJSON))
	return &Server{
		Router:     router,
		repository: repo,
		users:      handlers,
	}
}

func (s *Server) ConfigureHandlers() {
	s.Router.Post("/user/create", s.users.HandleCreateUser)
	s.Router.Get("/user/{username}", s.users.HandleGetByUsername)
	s.Router.Get("/user", s.users.HandleGetByEmail)
	s.Router.Post("/login", s.users.HandleLogin)
}
