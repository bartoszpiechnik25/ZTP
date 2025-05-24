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
	sqlc generate 
  buf generate --clean
  find python/gen -type d -exec touch {}/__init__.py \;
  cd go
  go generate ./...
migrate:
	cd go && go run cmd/db/main.go
lint:
	cd go && golangci-lint run
fix:
	cd go && golangci-lint run --fix
test:
	cd go && go test -v -count=1 ./internal/...

# Run database migrations
migrate:
	cd go && go run cmd/db_migrate/main.go

# Start development server with hot-reloading
dev:
	cd go && air -c .air.toml

# Run server without hot-reloading
run:
	cd go && go run cmd/api/main.go

# Build server and migrations binaries
build:
  cd go
	mkdir -p bin
	go build -o bin/server cmd/api/main.go
	go build -o bin/migrations cmd/db_migrate/main.go

#---------------------------------------------------------------------
# Utility Commands
#---------------------------------------------------------------------

# Clean temporary and build files
clean:
  cd go
	rm -rf bin/
	rm -rf tmp/
