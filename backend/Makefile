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
