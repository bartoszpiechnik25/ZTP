package server

import (
	"ztp/internal/config"
	"ztp/internal/handlers/document"
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
	documents  *document.DocumentService
	ocrService *ocr.OcrServiceImpl
	repository *repository.Repository
}

func New(config *config.Config, pool *pgxpool.Pool) *Server {
	router := chi.NewMux()
	repo := repository.NewRepository(config.DbConfig, pool)
	documentService := document.New(repo)
	auth := jwtauth.New(config.ServerConfig.JwtAlgo, []byte(config.ServerConfig.JwtSecretKey), nil)
	handlers := user.NewUserService(repo, auth)
	ocrService := ocr.NewOcrService(repo, config.GrpcConfig.SchedulerGrpcAddr)

	configureRouter(router)

	return &Server{
		Router:     router,
		repository: repo,
		users:      handlers,
		ocrService: ocrService,
		documents:  documentService,
		jwtAuth:    auth,
	}
}

func (s *Server) ConfigureHandlers() {
	// Private routes
	s.Router.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(s.jwtAuth))
		r.Use(jwtauth.Authenticator(s.jwtAuth))

		// User routes
		r.Route("/user", func(r chi.Router) {
			r.Get("/{username}", s.users.HandleGetByUsername)
			r.Get("/", s.users.HandleGetByEmail)
			r.Get("/documents", s.documents.HandleGetAllUserDocuments)
		})

		// Document routes
		r.Route("/document", func(r chi.Router) {
			r.Post("/", s.documents.HandleCreateDocument)
			r.Get("/types", s.documents.HandleGetDocumentTypes)
			r.Get("/categories", s.documents.HandleGetDocumentCategories)
			r.Get("/{id}", s.documents.HandleGetDocumentById)
			r.Delete("/{id}", s.documents.HandleDeleteDocument)
			r.Post("/ocr/{id}", s.ocrService.HandleDetectDocumentText)
		})
	})

	// Public routes
	s.Router.Post("/user/create", s.users.HandleCreateUser)
	s.Router.Post("/login", s.users.HandleLogin)
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
