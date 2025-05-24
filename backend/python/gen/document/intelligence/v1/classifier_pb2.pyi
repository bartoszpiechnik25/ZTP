from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class DocumentType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    DOCUMENT_TYPE_UNSPECIFIED: _ClassVar[DocumentType]
    DOCUMENT_TYPE_INVOICE: _ClassVar[DocumentType]
DOCUMENT_TYPE_UNSPECIFIED: DocumentType
DOCUMENT_TYPE_INVOICE: DocumentType

class ClassifyDocumentRequest(_message.Message):
    __slots__ = ("document_id", "job_id", "image")
    DOCUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    JOB_ID_FIELD_NUMBER: _ClassVar[int]
    IMAGE_FIELD_NUMBER: _ClassVar[int]
    document_id: str
    job_id: str
    image: bytes
    def __init__(self, document_id: _Optional[str] = ..., job_id: _Optional[str] = ..., image: _Optional[bytes] = ...) -> None: ...

class ClassifyDocumentResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
