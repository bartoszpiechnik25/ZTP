from dataclasses import dataclass
import os


@dataclass
class Config:
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    REGION = os.getenv("AWS_DEFAULT_REGION")
    CLASSIFIER_PORT = os.getenv("CLASSIFIER_PORT")
    OCR_PORT = os.getenv("OCR_PORT")
    SCHEDULER_PORT = os.getenv("SCHEDULER_PORT")

    def get_ocr_queue_url(self) -> str:
        return "http://localstack:4566/000000000000/ocr"

    def get_classifier_queue_url(self) -> str:
        return "http://localstack:4566/000000000000/classifier"

    def get_ocr_port(self) -> str:
        return f"[::]:{self.SCHEDULER_PORT}"
