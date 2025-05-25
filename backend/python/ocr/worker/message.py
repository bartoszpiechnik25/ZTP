from dataclasses import dataclass
import uuid

uuid.uuid4()

@dataclass
class Message:
    id: uuid.UUID
