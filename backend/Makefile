generate:
	sqlc generate && go generate ./...
migrate:
	go run cmd/db/main.go
lint:
	golangci-lint run
fix:
	golangci-lint run --fix
test:
	go test -v -count=1 ./internal/...
install:
	go install github.com/golang/mock/mockgen@latest && \
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && \
	go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.1.6
