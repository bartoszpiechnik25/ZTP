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
	go install github.com/golang/mock/mockgen@latest && \
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v2.1.6
