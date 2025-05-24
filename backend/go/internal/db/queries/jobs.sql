-- name: CreateJob :exec
INSERT INTO jobs (id, status, document_id, started_at)
    VALUES ($1, $2, $3, $4);

