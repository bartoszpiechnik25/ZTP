FROM debian:12-slim

WORKDIR /app

RUN apt-get update && \
  apt-get install -y curl

COPY . .

ENTRYPOINT [ "sh", "-c", "/app/create_sample_users.sh"]
