gen:
	sqlc generate
migrate:
	go run cmd/db/main.go
lint:
	golangci-lint run
lint-fix:
	golangci-lint run --fix
test_unit:
	go test -count=1 ./internal/...
