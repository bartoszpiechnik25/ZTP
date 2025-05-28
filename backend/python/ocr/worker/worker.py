from types_boto3_sqs import SQSClient
from boto3.session import Session
from .message import Message
from .config import Config
from .log import logger
from typing import Tuple
import time
import document.intelligence.v1.callback_pb2_grpc as callback_grpc
import document.intelligence.v1.callback_pb2 as callback_data
import grpc


class Worker:
    def __init__(self, config: Config):
        self.queue_url = config.get_ocr_queue_url()
        self.ocr_callback_url = config.CALLBACK_GRPC_ADDR
        self.grpc_channel = grpc.insecure_channel(self.ocr_callback_url)
        self.stub = callback_grpc.DocumentIntelligenceCallbackServiceStub(
            self.grpc_channel
        )
        self.sqs: SQSClient = Session().client(
            "sqs",
            region_name=config.REGION,
            aws_access_key_id=config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
            endpoint_url=self.queue_url,
        )
        self._running = True

    def dequeue(self) -> Tuple[Message | None, str | None]:
        response = self.sqs.receive_message(
            QueueUrl=self.queue_url,
            MaxNumberOfMessages=1,
            WaitTimeSeconds=10,
        )
        messages = response.get("Messages", [])
        if not messages:
            return None, None

        message = messages[0]
        receipt_handle = message["ReceiptHandle"]
        body = message["Body"]

        try:
            parsed_message = Message.from_sqs_body(body)
        except ValueError as e:
            logger.error(f"Failed to parse message from SQS: {e}")
            return None, None

        return parsed_message, receipt_handle

    def run(self):
        logger.info("Starting queue worker...")
        while self._running:
            try:
                message, receipt = self.dequeue()
                if message:
                    self.handle_message(message, receipt)
            except Exception as e:
                logger.error(f"Error in queue processing loop: {e}")
                time.sleep(3)

    def handle_message(self, message: Message, receipt: str):
        logger.info(f"Handling message: {message}")

        try:
            # Simulate some processing
            time.sleep(3)

            self.callback(
                job_id=str(message.job_id),
                document_id=str(message.document_id),
                text_length=23,
                content="some random str rn",
            )

            logger.info(f"Finishing processing {message}")

            self.sqs.delete_message(QueueUrl=self.queue_url, ReceiptHandle=receipt)

        except grpc.RpcError as e:
            logger.error(f"gRPC callback failed: {e.details()} (code: {e.code()})")

        except Exception as e:
            logger.error(f"Unhandled exception while processing message: {e}")

    def callback(self, job_id: str, document_id: str, text_length: int, content: str):
        request = callback_data.ResumeTextDetectionRequest(
            job_id=job_id,
            document_id=document_id,
            text_length=text_length,
            document_content=content,
        )
        logger.info(f"Sending gRPC callback for job_id={job_id}")
        self.stub.ResumeTextDetection(request)
        logger.info("gRPC callback sent successfully")
