package errors

import "errors"

var (
	ErrInvalidPassword       = errors.New("invalid password")
	ErrIncompleteRequestData = errors.New("incomplete request data")
	ErrNotFound              = errors.New("not found")
	ErrAlreadyExsits         = errors.New("already exists")
)
