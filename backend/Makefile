.PHONY: install db-start db-stop db-reset generate migrate dev run lint fix test build clean

generate:
	sqlc generate
	buf generate --clean
	find python/gen -type d -exec touch {}/__init__.py \;
	cd go && go generate ./...

lint:
	cd go && golangci-lint run

fix:
	cd go && golangci-lint run --fix

test:
	cd go && go test -v -count=1 ./internal/...

migrate:
	cd go && go run cmd/db_migrate/main.go

dev:
	cd go && air -c .air.toml

run:
	cd go && go run cmd/api/main.go

build:
	cd go && mkdir -p bin
	cd go && go build -o bin/server cmd/api/main.go
	cd go && go build -o bin/migrations cmd/db_migrate/main.go

clean:
	cd go && rm -rf bin/
	cd go && -rf tmp/

install:
	go install github.com/golang/mock/mockgen@latest && \
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && \
	go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.1.6 && \
	go install github.com/air-verse/air@latest

db-start:
	docker compose -f ../docker-compose.yaml up postgres -d

db-stop:
	docker compose -f ../docker-compose.yaml stop postgres

db-reset:
	docker compose -f ../docker-compose.yaml rm -f postgres
	docker volume rm ztp_ztp_data || true
	make db-start
	sleep 3
	make migrate

