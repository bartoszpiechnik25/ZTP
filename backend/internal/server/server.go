package server

import (
	"net/http"
	"time"
	"ztp/internal/config"
	"ztp/internal/handlers"
	repository "ztp/internal/repositories"
	"ztp/internal/utils"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Server struct {
	Router     *chi.Mux
	handlers   handlers.Handlers
	repository *repository.Repository
}

func New(config *config.Config, pool *pgxpool.Pool) *Server {
	router := chi.NewMux()
	router.Use(middleware.Timeout(20 * time.Second))
	repo := repository.New(config.DbConfig, pool)
	handlers := handlers.New(repo)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	return &Server{
		Router:     router,
		repository: repo,
		handlers:   handlers,
	}
}

func (s *Server) ConfigureHandlers() {
	s.Router.Post("/user/create", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		params, err := utils.MapRequestBodyToAddUserModel(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = s.handlers.CreateUser.Handle(ctx, params)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})
}
