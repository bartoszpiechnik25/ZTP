# ZTP Application

This project consists of a Go backend API server and a React frontend, using PostgreSQL for data storage.

## Quick Start

### Prerequisites
- Docker or Podman
- Make
- Go 1.24+ (for local development)
- Node.js and yarn (for frontend development)

## Running the Application

### With Docker

```bash
docker compose up -d
```

This will:

1. Start PostgreSQL database
2. Run database migrations
3. Start the backend server on port :2137
4. ~~Serve the frontend application~~ **TODO** 

### With Podman

```bash
podman-compose -f podman-compose.yaml up --build -d
```

We provide a separate compose file for Podman to avoid runtime compatibility issues.


## Development Setup

### Backend Development

Setup environment:

```bash
cd backend
make install
```

Start local development server:

```bash
# Start the database (Docker)
make db-start

# Run server
make dev
```

You may also update the code and run migrations:

```bash
# Generate code from SQL
make generate

# Run migrations
make migrate
```

See the [README.md](./backend/README.md) for more detailed backend documentation.

### Frontend development

Setup environment:

```bash
cd frontend
yarn install
```

Run frontend server:

```bash
npm run dev
```

See the [README.md](./frontend/README.md) for more detailed frontend documentation.

***TODO***

---
