-- name: GetUsers :many
select * from users;

-- name: GetUserByID :one
select * from users u where u.id = $1;

-- name: AddUser :exec
insert into users (id, name, surname, username, email, phone_number, user_role) values ($1, $2, $3, $4, $5, $6, $7);
