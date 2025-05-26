from types_boto3_sqs import SQSClient
from boto3.session import Session
from .message import Message
from .config import Config


class Queue:
    def __init__(self, config: Config, service: str):
        self.queue_url = config.get_queue_url(service)
        self.sqs: SQSClient = Session().client(
            "sqs",
            region_name=config.REGION,
            aws_access_key_id=config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
            endpoint_url=self.queue_url,
        )

    def dequeue(self):
        response = self.sqs.receive_message(
            QueueUrl=self.queue_url,
            MaxNumberOfMessages=1,
            WaitTimeSeconds=10,
        )
        messages = response.get("Messages", [])
        if not messages:
            return None
        message = messages[0]
        receipt_handle = message["ReceiptHandle"]

        self.sqs.delete_message(QueueUrl=self.queue_url, ReceiptHandle=receipt_handle)
        return message["Body"]

    def enqueue(self, message: Message):
        response = self.sqs.send_message(
            QueueUrl=self.queue_url, MessageBody=message.to_json()
        )
        return response.get("MessageId")
