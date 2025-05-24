FROM golang:1.24-bookworm AS builder

ARG IN_DOCKER_CONTAINER
ENV IN_DOCKER_CONTAINER=${IN_DOCKER_CONTAINER}

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . /app/

RUN go build -o server /app/cmd/api/main.go
RUN go build -o migrations /app/cmd/db_migrate/main.go

FROM debian:12-slim

WORKDIR /app

RUN apt update && apt install ca-certificates -y

COPY --from=builder /app/server /app/migrations /app/.env /app/
