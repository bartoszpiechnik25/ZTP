import document.intelligence.v1.ocr_pb2_grpc as ocr
import document.intelligence.v1.ocr_pb2 as data
import document.intelligence.v1.classifier_pb2_grpc as classifier
import document.intelligence.v1.classifier_pb2 as classifier_data
from concurrent.futures import ThreadPoolExecutor
import grpc
import logging
from rich.logging import RichHandler
from .message import Message
from .config import Config
from .worker import Queue

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[RichHandler(rich_tracebacks=True)],
)

logger = logging.getLogger("document-ocr")


class Scheduler(
    ocr.DocumentOCRServiceServicer, classifier.DocumentClassifierServiceServicer
):
    def __init__(self, worker: Queue):
        self.worker = worker

    def DetectDocumentText(
        self, request: data.DetectDocumentTextRequest, context
    ) -> data.DetectDocumentTextResponse:
        logger.info(
            f"Detect Document Text Received for {request.document_id} with job id {request.job_id}"
        )
        try:
            message = Message.from_proto(request)
            message_id = self.worker.enqueue(message, "ocr")
        except Exception as e:
            logger.error(
                f"Error scheduling job for document {request.document_id} due to: {e}"
            )
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to schedule OCR job: {e}")
        else:
            logger.info(f"Successfully enqueued with id: {message_id}")

        return data.DetectDocumentTextResponse()

    def ClassifyDocument(
        self, request: classifier_data.ClassifyDocumentRequest, context
    ) -> classifier_data.ClassifyDocumentResponse:
        logger.info(
            f"Classify Document Received for {request.document_id} with job id {request.job_id}"
        )
        try:
            message = Message.from_proto(request)
            message_id = self.worker.enqueue(message, "ocr")
        except Exception as e:
            logger.error(
                f"Error scheduling job for document {request.document_id} due to: {e}"
            )
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to schedule classification job: {e}")
            return classifier_data.ClassifyDocumentResponse()
        else:
            logger.info(f"Successfully enqueued with id: {message_id}")
            return classifier_data.ClassifyDocumentResponse()


def serve(config: Config):
    worker = Queue(config)
    port = config.get_ocr_port()
    servicer = Scheduler(worker)
    server = grpc.server(ThreadPoolExecutor(max_workers=5))
    ocr.add_DocumentOCRServiceServicer_to_server(servicer, server)
    classifier.add_DocumentClassifierServiceServicer_to_server(servicer, server)
    logger.info(f"Starting grpc scheduler server on port: {port}")
    server.add_insecure_port(port)
    server.start()
    logger.info("server started")
    server.wait_for_termination()
