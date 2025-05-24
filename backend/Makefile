#---------------------------------------------------------------------
.PHONY: install db-start db-stop db-reset generate migrate dev run lint fix test build clean
#---------------------------------------------------------------------
# Development Environment
#---------------------------------------------------------------------

# Install all required development tools
install:
	go install github.com/golang/mock/mockgen@latest && \
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && \
	go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.1.6 && \
	go install github.com/air-verse/air@latest

# Start PostgreSQL database in Docker
db-start:
	docker compose -f ../docker-compose.yaml up postgres -d

# Stop PostgreSQL database container
db-stop:
	docker compose -f ../docker-compose.yaml stop postgres

# Reset database - remove container, volume and recreate
db-reset:
	docker compose -f ../docker-compose.yaml rm -f postgres
	docker volume rm ztp_ztp_data || true
	make db-start
	sleep 3
	make migrate

# Generate Go code from SQL schemas and interfaces
generate:
	sqlc generate && go generate ./...

# Run database migrations
migrate:
	go run cmd/db_migrate/main.go

# Start development server with hot-reloading
dev:
	air -c .air.toml

# Run server without hot-reloading
run:
	go run cmd/api/main.go

#---------------------------------------------------------------------
# Code Quality
#---------------------------------------------------------------------

# Run linter to check code quality
lint:
	golangci-lint run

# Fix automatically fixable lint issues
fix:
	golangci-lint run --fix

# Run all unit tests with verbose output
test:
	go test -v -count=1 ./internal/...

#---------------------------------------------------------------------
# Build
#---------------------------------------------------------------------

# Build server and migrations binaries
build:
	mkdir -p bin
	go build -o bin/server cmd/api/main.go
	go build -o bin/migrations cmd/db_migrate/main.go

#---------------------------------------------------------------------
# Utility Commands
#---------------------------------------------------------------------

# Clean temporary and build files
clean:
	rm -rf bin/
	rm -rf tmp/
