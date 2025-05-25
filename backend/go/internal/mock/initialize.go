package mock

import (
	"testing"
	"ztp/internal/mock/mocks"

	"github.com/golang/mock/gomock"
)

type Mocks struct {
	ctrl      *gomock.Controller
	StoreMock *mocks.MockStore
}

func InitializeMocks(t *testing.T) *Mocks {
	ctrl := gomock.NewController(t)
	return &Mocks{
		ctrl:      ctrl,
		StoreMock: mocks.NewMockStore(ctrl),
	}
}

func (m *Mocks) Cleanup() func() {
	return m.ctrl.Finish
}
