package errors

import (
	"database/sql"

	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"

	"github.com/jackc/pgx/v5/pgconn"
)

func HandleDbError(err error) error {
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.WithMessage(ErrNotFound, "no rows in result set: "+err.Error())
		}

		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			logrus.Info(pgErr.Code)
			switch pgErr.Code {
			case "23505":
				return errors.WithMessage(ErrAlreadyExsits, "insert violates unique constraint: "+pgErr.Detail)
			case "23503":
				return errors.WithMessage(ErrNotFound, "foreign key constraint violation: "+pgErr.Detail)
			}
		}

		return errors.Wrap(err, "could not execute database operation")
	}
	return nil
}
