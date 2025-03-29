FROM golang:1.24-bookworm AS builder

ARG IN_DOCKER_CONTAINER
ENV IN_DOCKER_CONTAINER=${IN_DOCKER_CONTAINER}

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . /app/

RUN go build -o migrations /app/cmd/db/main.go

FROM debian:12-slim

WORKDIR /app

COPY --from=builder /app/migrations /app/.env /app/

CMD [ "/app/migrations" ]
