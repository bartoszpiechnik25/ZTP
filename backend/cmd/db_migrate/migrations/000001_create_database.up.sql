-- +migrate Up
-- Drop type if it exists and create a new enum type for user roles
DROP TYPE IF EXISTS user_role CASCADE;

CREATE EXTENSION pgcrypto;

CREATE TYPE user_role AS enum (
    'admin',
    'user'
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    name text NULL,
    surname text NULL,
    username text NOT NULL UNIQUE,
    email text UNIQUE NOT NULL UNIQUE,
    password text NOT NULL,
    phone_number text NOT NULL,
    user_role user_role NOT NULL DEFAULT 'user'
);

-- Create document types table
CREATE TABLE IF NOT EXISTS document_types (
    id uuid PRIMARY KEY,
    name text UNIQUE NOT NULL
);

-- Create document categories table
CREATE TABLE IF NOT EXISTS document_categories (
    id uuid PRIMARY KEY,
    name text UNIQUE NOT NULL
);

-- Create document tags table
CREATE TABLE IF NOT EXISTS document_tags (
    id uuid PRIMARY KEY,
    name text UNIQUE NOT NULL
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id uuid PRIMARY KEY,
    title text,
    url text NOT NULL,
    notes text,
    ocr_content text NULL,
    document_type_id uuid NOT NULL REFERENCES document_types (id),
    document_category_id uuid NOT NULL REFERENCES document_categories (id)
);

-- Create document versions table
CREATE TABLE IF NOT EXISTS document_versions (
    id uuid PRIMARY KEY,
    document_id uuid NOT NULL REFERENCES documents (id),
    version_number int NOT NULL,
    file_url text NOT NULL,
    created_at timestamptz NOT NULL
);

-- Create document change history table
CREATE TABLE IF NOT EXISTS document_change_history (
    id uuid PRIMARY KEY,
    document_id uuid NOT NULL REFERENCES documents (id),
    changed_by uuid NOT NULL REFERENCES users (id),
    change_description text,
    changed_at timestamptz NOT NULL
);

-- Create document tag associations table
CREATE TABLE IF NOT EXISTS document_tag_associations (
    document_id uuid NOT NULL REFERENCES documents (id),
    tag_id uuid NOT NULL REFERENCES document_tags (id)
);

-- Create document classification table
CREATE TABLE IF NOT EXISTS document_classification (
    id uuid PRIMARY KEY,
    document_id uuid NOT NULL REFERENCES documents (id),
    classification_result text,
    confidence_score float,
    classified_at timestamptz NOT NULL
);

-- Create user documents table
CREATE TABLE IF NOT EXISTS user_documents (
    user_id uuid NOT NULL REFERENCES users (id),
    document_id uuid NOT NULL REFERENCES documents (id)
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id uuid PRIMARY KEY,
    status text,
    user_id uuid REFERENCES users (id),
    document_id uuid NOT NULL REFERENCES documents (id),
    started_at timestamptz NOT NULL,
    finished_at timestamptz NULL
);

