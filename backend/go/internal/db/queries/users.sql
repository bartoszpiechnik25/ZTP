-- name: GetUsers :many
SELECT
    *
FROM
    users;

-- name: GetUserByID :one
SELECT
    *
FROM
    users u
WHERE
    u.id = $1;

-- name: GetUserByEmail :one
SELECT
    *
FROM
    users u
WHERE
    u.email = $1;

-- name: GetUserByUsername :one
SELECT
    *
FROM
    users u
WHERE
    u.username = $1;

-- name: UserExists :one
select u.id, u.username, u.password from users u where u.username = $1;

-- name: AddUser :exec
INSERT INTO users (id, name, surname, username, email, password, phone_number, user_role)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

