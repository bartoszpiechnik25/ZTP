drop type if exists user_role cascade;
create type user_role as enum ('admin', 'user');

create table if not exists users (
	id uuid primary key,
	name text null,
	surname text null,
	username text not null,
	email text unique not null,
	phone_number text not null,
	user_role user_role not null default 'user'
);

create table if not exists document_types(
	id uuid primary key,
	name text unique not null
);

create table if not exists document_categories(
	id uuid primary key,
	name text unique not null
);

create table if not exists document_tags (
    id uuid primary key,
    name text unique not null
);

create table if not exists documents (
	id uuid primary key,
	title text,
	url text not null,
	ocr_content text null,
	document_type_id uuid references document_types(id) not null,
	document_category_id uuid references document_categories(id) not null
);

create table if not exists document_versions (
    id uuid primary key,
    document_id uuid references documents(id) not null,
    version_number int not null,
    file_url text not null,
    created_at timestamptz not null
);


create table if not exists document_change_history (
    id uuid primary key,
    document_id uuid references documents(id) not null,
    changed_by uuid references users(id) not null,
    change_description text,
    changed_at timestamptz not null
);

create table if not exists document_tag_associations (
    document_id uuid references documents(id) not null,
    tag_id uuid references document_tags(id) not null
);

create table if not exists document_classification (
    id uuid primary key,
    document_id uuid references documents(id) not null,
    classification_result text,
    confidence_score float,
    classified_at timestamptz not null
);

create table if not exists user_documents(
	user_id uuid references users(id) not null,
	document_id uuid references documents(id) not null
);

create table if not exists jobs(
	id uuid primary key,
	status text,
	user_id uuid references users(id),
	document_id uuid references documents(id) not null,
	started_at timestamptz not null,
	finished_at timestamptz null
)
