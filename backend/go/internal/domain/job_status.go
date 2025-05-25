package domain

type JobStatus string

func (js JobStatus) String() string {
	return string(js)
}

const (
	JobStatusCreated   JobStatus = "created"
	JobStatusSent      JobStatus = "sent"
	JobStatusPending   JobStatus = "pending"
	JobStatusCompleted JobStatus = "completed"
	JobStatusFailed    JobStatus = "failed"
)
