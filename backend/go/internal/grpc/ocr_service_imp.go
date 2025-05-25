package document_ml

import (
	"context"
	pb "ztp/internal/gen/document/intelligence/v1"

	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Ocr struct {
	grpcClient pb.DocumentOCRServiceClient
}

func NewOcrService() *Ocr {
	conn, err := grpc.NewClient("classifier:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic("could not create grpc client")
	}
	return &Ocr{
		grpcClient: pb.NewDocumentOCRServiceClient(conn),
	}
}

func (o *Ocr) DetectDocumentText(ctx context.Context, document_id, job_id uuid.UUID) error {
	request := pb.DetectDocumentTextRequest{
		DocumentId: document_id.String(),
		JobId:      job_id.String(),
		Image:      nil,
	}

	_, err := o.grpcClient.DetectDocumentText(ctx, &request)
	if err != nil {
		return err
	}
	return nil
}
