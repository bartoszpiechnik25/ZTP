# ZTP

## Run app locally

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

### Try REST API
To check if the server is working correctly you can send the following request:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "some_artificial_mail@gmail.com", "username": "username", "role": "user", "phone_number": "+48945323417"}' localhost:2137/user/create
```
It should create user with given data and save it to the database returning status code `201`.
