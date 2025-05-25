FROM python:3.13-slim-bookworm

WORKDIR /app

RUN pip install --upgrade pip

COPY ocr/requirements.txt .

RUN pip install -r requirements.txt

COPY ./ocr pyproject.toml /app/

COPY gen/ gen/

RUN pip install -e .
