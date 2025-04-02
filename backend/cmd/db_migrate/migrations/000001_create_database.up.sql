-- +migrate Up

-- Drop type if it exists and create a new enum type for user roles
drop type if exists user_role cascade;
create type user_role as enum ('admin', 'user');

-- Create users table
create table if not exists users (
    id uuid primary key,
    name text null,
    surname text null,
    username text not null,
    email text unique not null,
    phone_number text not null,
    user_role user_role not null default 'user'
);

-- Create document types table
create table if not exists document_types (
    id uuid primary key,
    name text unique not null
);

-- Create document categories table
create table if not exists document_categories (
    id uuid primary key,
    name text unique not null
);

-- Create document tags table
create table if not exists document_tags (
    id uuid primary key,
    name text unique not null
);

-- Create documents table
create table if not exists documents (
    id uuid primary key,
    title text,
    url text not null,
    ocr_content text null,
    document_type_id uuid not null references document_types(id),
    document_category_id uuid not null references document_categories(id)
);

-- Create document versions table 
create table if not exists document_versions (
    id uuid primary key,
    document_id uuid not null references documents(id),
    version_number int not null,
    file_url text not null,
    created_at timestamptz not null
);

-- Create document change history table
create table if not exists document_change_history (
    id uuid primary key,
    document_id uuid not null references documents(id),
    changed_by uuid not null references users(id),
    change_description text,
    changed_at timestamptz not null
);

-- Create document tag associations table
create table if not exists document_tag_associations (
    document_id uuid not null references documents(id),
    tag_id uuid not null references document_tags(id)
);

-- Create document classification table
create table if not exists document_classification (
    id uuid primary key,
    document_id uuid not null references documents(id),
    classification_result text,
    confidence_score float,
    classified_at timestamptz not null
);

-- Create user documents table
create table if not exists user_documents (
    user_id uuid not null references users(id),
    document_id uuid not null references documents(id)
);

-- Create jobs table
create table if not exists jobs (
    id uuid primary key,
    status text,
    user_id uuid references users(id),
    document_id uuid not null references documents(id),
    started_at timestamptz not null,
    finished_at timestamptz null
);
