FROM python:3.13-slim-bookworm

WORKDIR /app

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ./scheduler pyproject.toml /app/

COPY gen/ gen/

RUN pip install -e .
