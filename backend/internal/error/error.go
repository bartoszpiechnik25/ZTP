package errors

import "errors"

var (
	InvalidPasswordError       = errors.New("invalid password")
	IncompleteRequestDataError = errors.New("incomplete request data")
	NotFoundErr                = errors.New("not found")
	AlreadyExsitsError         = errors.New("already exists")
)

