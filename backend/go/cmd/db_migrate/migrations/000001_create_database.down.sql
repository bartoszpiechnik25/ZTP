-- +migrate Down

drop table if exists jobs;
drop table if exists user_documents;
drop table if exists document_classification;
drop table if exists document_tag_associations;
drop table if exists document_change_history;
drop table if exists document_versions;
drop table if exists documents;
drop table if exists document_pages;
drop table if exists document_tags;
drop table if exists document_categories;
drop table if exists document_types;
drop table if exists users;
drop type if exists user_role;
