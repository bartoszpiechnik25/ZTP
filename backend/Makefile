generate:
	sqlc generate -f sqlc.yaml && buf generate --clean && find python/gen -type d -exec touch {}/__init__.py \; && cd go && go generate ./...
gen:
	cd go && go generate ./...
migrate:
	cd go && go run cmd/db/main.go
lint:
	cd go && golangci-lint run
fix:
	cd go && golangci-lint run --fix
test:
	cd go && go test -v -count=1 ./internal/...
install:
	go install github.com/golang/mock/mockgen@latest && \
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest && \
	go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.1.6 &&
