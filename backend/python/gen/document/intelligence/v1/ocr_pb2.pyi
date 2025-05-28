from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class DetectDocumentTextRequest(_message.Message):
    __slots__ = ("document_id", "job_id", "image_url")
    DOCUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    JOB_ID_FIELD_NUMBER: _ClassVar[int]
    IMAGE_URL_FIELD_NUMBER: _ClassVar[int]
    document_id: str
    job_id: str
    image_url: str
    def __init__(self, document_id: _Optional[str] = ..., job_id: _Optional[str] = ..., image_url: _Optional[str] = ...) -> None: ...

class DetectDocumentTextResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
