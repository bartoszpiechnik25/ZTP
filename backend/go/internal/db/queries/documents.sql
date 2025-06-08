-- name: CreateDocument :exec
INSERT INTO documents (id, title, notes, document_type_id, document_category_id)
    VALUES ($1, $2, $3, $4, $5);

-- name: CreateDocumentPage :exec
INSERT INTO document_pages (id, page_number, content_type, data, ocr_content, document_id)
    VALUES ($1, $2, $3, $4, $5, $6);

-- name: CreateUserDocument :exec
INSERT INTO user_documents (user_id, document_id)
    VALUES ($1, $2);

-- name: GetDocumentType :one
SELECT
    *
FROM
    document_types dt
WHERE
    dt.name = $1;

-- name: GetDocumentCategory :one
SELECT
    *
FROM
    document_categories dc
WHERE
    dc.name = $1;

-- name: GetDocumentCategories :many
SELECT
    *
FROM
    document_categories;

-- name: GetDocumentTypes :many
SELECT
    *
FROM
    document_types;

-- name: GetAllUserDocuments :many
SELECT
    d.id,
    d.title,
    d.notes,
    dc.name AS category,
    dt.name AS type
FROM
    user_documents ud
    JOIN documents d ON d.id = ud.document_id
    JOIN document_categories dc ON dc.id = d.document_category_id
    JOIN document_types dt ON dt.id = d.document_type_id
WHERE
    ud.user_id = $1;

