drop type if exists user_role;
create type user_role as enum ('adimn', 'user');

create table if not exists users (
	id uuid primary key,
	name text null,
	surname text null,
	username text not null,
	email text not null,
	phone_number text not null,
	role  user_role default 'user' not null
);

create table if not exists document_types(
	id uuid primary key,
	name text
);

create table if not exists document_categories(
	id uuid primary key,
	name text
);

create table if not exists documents (
	id uuid primary key,
	title text,
	url text not null,
	ocr_content text null,
	document_type_id uuid references document_types(id) not null,
	document_category_id uuid references document_categories(id) not null
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
