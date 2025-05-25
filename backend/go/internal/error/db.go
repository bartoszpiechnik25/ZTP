package errors

import (
	"github.com/pkg/errors"

	"github.com/jackc/pgx/v5/pgconn"
)

func HandleDbError(err error) error {
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			if pgErr.Code == "23505" {
				return errors.Wrap(ErrAlreadyExsits, "insert violates unique constraint")
			}
			if pgErr.Code == "23503" {
				return errors.Wrap(ErrNotFound, "foreign key constraint violation")
			}
		}
		return errors.Wrap(err, "could not create new record")
	}
	return nil
}
