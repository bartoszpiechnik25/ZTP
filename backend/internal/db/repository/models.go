// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0

package sqlcrepositiories

import (
	"database/sql/driver"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type UserRole string

const (
	UserRoleAdimn UserRole = "adimn"
	UserRoleUser  UserRole = "user"
)

func (e *UserRole) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = UserRole(s)
	case string:
		*e = UserRole(s)
	default:
		return fmt.Errorf("unsupported scan type for UserRole: %T", src)
	}
	return nil
}

type NullUserRole struct {
	UserRole UserRole `json:"user_role"`
	Valid    bool     `json:"valid"` // Valid is true if UserRole is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullUserRole) Scan(value interface{}) error {
	if value == nil {
		ns.UserRole, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.UserRole.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullUserRole) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.UserRole), nil
}

type Document struct {
	ID                 uuid.UUID `json:"id"`
	Title              *string   `json:"title"`
	Url                string    `json:"url"`
	OcrContent         *string   `json:"ocr_content"`
	DocumentTypeID     uuid.UUID `json:"document_type_id"`
	DocumentCategoryID uuid.UUID `json:"document_category_id"`
}

type DocumentCategory struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type DocumentChangeHistory struct {
	ID                uuid.UUID `json:"id"`
	DocumentID        uuid.UUID `json:"document_id"`
	ChangedBy         uuid.UUID `json:"changed_by"`
	ChangeDescription *string   `json:"change_description"`
	ChangedAt         time.Time `json:"changed_at"`
}

type DocumentClassification struct {
	ID                   uuid.UUID `json:"id"`
	DocumentID           uuid.UUID `json:"document_id"`
	ClassificationResult *string   `json:"classification_result"`
	ConfidenceScore      *float64  `json:"confidence_score"`
	ClassifiedAt         time.Time `json:"classified_at"`
}

type DocumentTag struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type DocumentTagAssociation struct {
	DocumentID uuid.UUID `json:"document_id"`
	TagID      uuid.UUID `json:"tag_id"`
}

type DocumentType struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type DocumentVersion struct {
	ID            uuid.UUID `json:"id"`
	DocumentID    uuid.UUID `json:"document_id"`
	VersionNumber int32     `json:"version_number"`
	FileUrl       string    `json:"file_url"`
	CreatedAt     time.Time `json:"created_at"`
}

type Job struct {
	ID         uuid.UUID          `json:"id"`
	Status     *string            `json:"status"`
	UserID     pgtype.UUID        `json:"user_id"`
	DocumentID uuid.UUID          `json:"document_id"`
	StartedAt  time.Time          `json:"started_at"`
	FinishedAt pgtype.Timestamptz `json:"finished_at"`
}

type User struct {
	ID          uuid.UUID `json:"id"`
	Name        *string   `json:"name"`
	Surname     *string   `json:"surname"`
	Username    string    `json:"username"`
	Email       string    `json:"email"`
	PhoneNumber string    `json:"phone_number"`
	Role        UserRole  `json:"role"`
}

type UserDocument struct {
	UserID     uuid.UUID `json:"user_id"`
	DocumentID uuid.UUID `json:"document_id"`
}
