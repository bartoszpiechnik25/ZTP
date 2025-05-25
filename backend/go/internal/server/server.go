package server

import (
	"ztp/internal/config"
	documentintelligence "ztp/internal/handlers/document_intelligence"
	"ztp/internal/handlers/user"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"github.com/jackc/pgx/v5/pgxpool"

	repository "ztp/internal/repositories"
)

type Server struct {
	Router     *chi.Mux
	users      *user.UserService
	ocrService *documentintelligence.OcrServiceImpl
	repository *repository.Repository
}

func New(config *config.Config, pool *pgxpool.Pool) *Server {
	router := chi.NewMux()
	repo := repository.New(config.DbConfig, pool)
	handlers := user.NewUserService(repo)
	ocr := documentintelligence.NewOcrService(repo)

	configureRouter(router)

	return &Server{
		Router:     router,
		repository: repo,
		users:      handlers,
		ocrService: ocr,
	}
}

func (s *Server) ConfigureHandlers() {
	s.Router.Post("/user/create", s.users.HandleCreateUser)
	s.Router.Get("/user/{username}", s.users.HandleGetByUsername)
	s.Router.Get("/user", s.users.HandleGetByEmail)
	s.Router.Post("/login", s.users.HandleLogin)
	s.Router.Post("/document/ocr/{id}", s.ocrService.HandleDetectDocumentText)
}

func configureRouter(router *chi.Mux) {
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.RequestID)
	router.Use(render.SetContentType(render.ContentTypeJSON))
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
}
