from types_boto3_sqs import SQSClient
from boto3.session import Session

class Queue:
    def __init__(self, queue_url: str):
        self.queue_url = queue_url
        self.sqs: SQSClient = Session().client("sqs")

    def dequeue(self):
        self.sqs.receive_message(QueueUrl=self.queue_url)

    def enqueue(self):
        self.sqs.send_message()

