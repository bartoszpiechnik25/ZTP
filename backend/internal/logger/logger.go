package logger

import (
	log "github.com/sirupsen/logrus"
)

func New(production bool) *log.Logger {
	logger := log.New()
	if production {
		logger.SetFormatter(&log.JSONFormatter{})
	}
	return logger
}
