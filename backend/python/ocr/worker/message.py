import json
from uuid import UUID
from dataclasses import dataclass
import document.intelligence.v1.ocr_pb2 as data


@dataclass
class Message:
    document_id: UUID
    job_id: UUID
    image_url: str

    def to_json(self) -> str:
        return json.dumps(
            {
                "document_id": self.document_id,
                "job_id": self.job_id,
                "image_url": self.image_url,
            }
        )

    @staticmethod
    def from_proto(request: data.DetectDocumentTextRequest) -> "Message":
        return Message(request.document_id, request.job_id, request.image_url)

    @staticmethod
    def from_sqs_body(body: str) -> "Message":
        try:
            parsed = json.loads(body)
            return Message(
                document_id=UUID(parsed["document_id"]),
                job_id=UUID(parsed["job_id"]),
                image_url=parsed["image_url"],
            )
        except (KeyError, ValueError, json.JSONDecodeError) as e:
            raise ValueError(f"Invalid SQS message format: {e}")
