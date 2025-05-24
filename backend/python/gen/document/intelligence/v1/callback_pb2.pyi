from document.intelligence.v1 import classifier_pb2 as _classifier_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ResumeClassificationRequest(_message.Message):
    __slots__ = ("job_id", "document_id", "document_type")
    JOB_ID_FIELD_NUMBER: _ClassVar[int]
    DOCUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    DOCUMENT_TYPE_FIELD_NUMBER: _ClassVar[int]
    job_id: str
    document_id: str
    document_type: _classifier_pb2.DocumentType
    def __init__(self, job_id: _Optional[str] = ..., document_id: _Optional[str] = ..., document_type: _Optional[_Union[_classifier_pb2.DocumentType, str]] = ...) -> None: ...

class ResumeTextDetectionRequest(_message.Message):
    __slots__ = ("job_id", "document_id", "text_length", "document_content")
    JOB_ID_FIELD_NUMBER: _ClassVar[int]
    DOCUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    TEXT_LENGTH_FIELD_NUMBER: _ClassVar[int]
    DOCUMENT_CONTENT_FIELD_NUMBER: _ClassVar[int]
    job_id: str
    document_id: str
    text_length: int
    document_content: str
    def __init__(self, job_id: _Optional[str] = ..., document_id: _Optional[str] = ..., text_length: _Optional[int] = ..., document_content: _Optional[str] = ...) -> None: ...

class ResumeClassificationResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ResumeTextDetectionResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
