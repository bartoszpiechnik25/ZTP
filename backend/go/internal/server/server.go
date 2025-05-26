package server

import (
	"ztp/internal/config"
	"ztp/internal/handlers/ocr"
	"ztp/internal/handlers/user"
	"ztp/internal/repository"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"github.com/go-chi/render"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Server struct {
	Router     *chi.Mux
	jwtAuth    *jwtauth.JWTAuth
	users      *user.UserService
	ocrService *ocr.OcrServiceImpl
	repository *repository.Repository
}

func New(config *config.Config, pool *pgxpool.Pool) *Server {
	router := chi.NewMux()
	repo := repository.NewRepository(config.DbConfig, pool)
	auth := jwtauth.New(config.ServerConfig.JwtAlgo, []byte(config.ServerConfig.JwtSecretKey), nil)
	handlers := user.NewUserService(repo, auth)
	ocrService := ocr.NewOcrService(repo)

	configureRouter(router)

	return &Server{
		Router:     router,
		repository: repo,
		users:      handlers,
		ocrService: ocrService,
		jwtAuth:    auth,
	}
}

func (s *Server) ConfigureHandlers() {
	// Private routes
	s.Router.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(s.jwtAuth))
		r.Use(jwtauth.Authenticator(s.jwtAuth))
		r.Get("/user/{username}", s.users.HandleGetByUsername)
		r.Get("/user", s.users.HandleGetByEmail)
	})

	// Public routes
	s.Router.Post("/user/create", s.users.HandleCreateUser)
	s.Router.Post("/login", s.users.HandleLogin)
	s.Router.Post("/document/ocr/{id}", s.ocrService.HandleDetectDocumentText)
}

func configureRouter(router *chi.Mux) {
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.RequestID)
	router.Use(render.SetContentType(render.ContentTypeJSON))
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))
}
