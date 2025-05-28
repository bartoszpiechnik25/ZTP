from types_boto3_sqs import SQSClient
from boto3.session import Session
from .message import Message
from .config import Config


class Publisher:
    def __init__(self, config: Config):
        self.ocr_queue_url = config.get_ocr_queue_url()
        self.ocr_sqs: SQSClient = Session().client(
            "sqs",
            region_name=config.REGION,
            aws_access_key_id=config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
            endpoint_url=self.ocr_queue_url,
        )

        self.classifier_queue_url = config.get_classifier_queue_url()
        self.classifier_sqs: SQSClient = Session().client(
            "sqs",
            region_name=config.REGION,
            aws_access_key_id=config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
            endpoint_url=self.classifier_queue_url,
        )

    def enqueue(self, message: Message, queue: str) -> str:
        response = None
        if queue == "classifier":
            response = self.classifier_sqs.send_message(
                QueueUrl=self.classifier_queue_url, MessageBody=message.to_json()
            )
        else:
            response = self.ocr_sqs.send_message(
                QueueUrl=self.ocr_queue_url, MessageBody=message.to_json()
            )
        return response.get("MessageId")
