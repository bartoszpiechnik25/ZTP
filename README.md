# ZTP

This is the backend service for the ZTP application. It's written in Go and uses PostgreSQL for data storage.

## Project Structure
- `cmd/` - Application entry points
  - `api/` - API server
  - `db_migrate/` - Database migration tool
- `internal/` - Internal packages
  - `config/` - Application configuration
  - `db/` - Database access and migrations
  - `handlers/` - HTTP handlers
  - `repositories/` - Data access layer
  - `server/` - HTTP server setup

## Development Setup

### Prerequisites

- Go 1.24 or higher
- Docker or Podman
- PostgreSQL 17.4 (can be run with Docker/Podman)

### Install Development Tools

```bash
make install
```

This will install:

- **mockgen** - for generating mocks for testing
- **sqlc** - for generating type-safe Go code from SQL
- **golangci-lint** - for code linting
- **air** - for hot reloading during development

### Environment Setup

Create a .env file in the project root directory:

```bash
cp ../.env.example ../.env
```

Configure the values according to your environment.

### Database Setup

Start a PostgreSQL database:

```bash
make db-start
```

Run database migrations:

```bash
make migrate
```

Or reset the database completely:

```bash
make db-reset
```

### Start the development server:

Run the server with hot-reloading:

```bash
make dev
```

You can also run server without hot-reloading feature:

```bash
make run
```

### Development tasks

Generate code from SQL and interfaces:

```bash
make generate
```

Lint your code:

```bash
make lint
```

Fix automatically fixable lint issues:

```bash
make fix
```

Run tests:

```bash
make test
```

Build binaries:

```bash
make build
```

### Testing API Endpoints

Create a new user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "test@example.com", "username": "testuser", "role": "user", "phone_number": "+48123456789", "password": "testpass"}' localhost:2137/user
```

Get a user by username:

```bash
curl -X GET http://localhost:2137/user/testuser
```

Login:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}' http://localhost:2137/login
```

## Production Deployment

The project includes Docker/Podman configurations for production deployment. 

### Docker

To start the application with docker simply run the following command:

```bash
docker compose up -d
```

It will create posgtres database, run migrations and if migrations succeeds start the server on port `:2137`

### Podman

To start the application with podman run the following command:

```bash
podman-compose -f podman-compose.yaml up --build -d
```

As podman supports docker runtime but have some caveyats we provided separate `.yaml` compose file for podman runtime to avoid errors.



