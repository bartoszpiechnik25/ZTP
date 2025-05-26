from dataclasses import dataclass
import os


@dataclass
class Config:
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    REGION = os.getenv("AWS_DEFAULT_REGION")
    CLASSIFIER_PORT = os.getenv("CLASSIFIER_PORT")

    def get_queue_url(self, service: str) -> str:
        return f"http://localstack:4566/000000000000/{service}"

    def get_classifier_port(self) -> str:
        return f"[::]:{self.CLASSIFIER_PORT}"
