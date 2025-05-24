import document.intelligence.v1.ocr_pb2_grpc as ocr
import document.intelligence.v1.ocr_pb2 as data
from concurrent.futures import ThreadPoolExecutor
import grpc
import logging
from rich.logging import RichHandler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[RichHandler(rich_tracebacks=True)],
)

logger = logging.getLogger("document-ocr")


class OCRService(ocr.DocumentOCRServiceServicer):
    def __init__(self):
        pass

    def DetectDocumentText(self, request: data.DetectDocumentTextRequest, context):
        logger.info(
            f"Detect Document Text Received for {request.document_id} with job id {request.job_id}"
        )
        return data.DetectDocumentTextResponse()


def serve(port: str):
    servicer = OCRService()
    server = grpc.server(ThreadPoolExecutor(max_workers=5))
    ocr.add_DocumentOCRServiceServicer_to_server(servicer, server)
    logger.info(f"Starting grpc server on port: {port}")
    server.add_insecure_port(port)
    server.start()
    logger.info("server started")
    server.wait_for_termination()
