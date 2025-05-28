package callback

import (
	"context"
	"ztp/internal/config"
	"ztp/internal/gen/document/intelligence/v1"

	"github.com/sirupsen/logrus"
)

type callbackServer struct {
	intelligence.UnimplementedDocumentIntelligenceCallbackServiceServer
}

func New(config *config.Config) *callbackServer {
	return &callbackServer{}
}

func (cs *callbackServer) ResumeClassification(ctx context.Context, request *intelligence.ResumeClassificationRequest) (*intelligence.ResumeClassificationResponse, error) {
	return &intelligence.ResumeClassificationResponse{}, nil
}

func (cs *callbackServer) ResumeTextDetection(ctx context.Context, request *intelligence.ResumeTextDetectionRequest) (*intelligence.ResumeTextDetectionResponse, error) {
	logrus.Infof("Handling grpc request for document with id: %s", request.DocumentId)
	return &intelligence.ResumeTextDetectionResponse{}, nil
}
