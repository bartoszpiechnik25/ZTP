# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: document/intelligence/v1/ocr.proto
# Protobuf Python Version: 6.31.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    6,
    31,
    0,
    '',
    'document/intelligence/v1/ocr.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\"document/intelligence/v1/ocr.proto\x12\x18\x64ocument.intelligence.v1\"p\n\x19\x44\x65tectDocumentTextRequest\x12\x1f\n\x0b\x64ocument_id\x18\x01 \x01(\tR\ndocumentId\x12\x15\n\x06job_id\x18\x02 \x01(\tR\x05jobId\x12\x1b\n\timage_url\x18\x03 \x01(\tR\x08imageUrl\"\x1c\n\x1a\x44\x65tectDocumentTextResponse2\x95\x01\n\x12\x44ocumentOCRService\x12\x7f\n\x12\x44\x65tectDocumentText\x12\x33.document.intelligence.v1.DetectDocumentTextRequest\x1a\x34.document.intelligence.v1.DetectDocumentTextResponseB*Z(ztp/proto/services/document/intelligenceb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'document.intelligence.v1.ocr_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z(ztp/proto/services/document/intelligence'
  _globals['_DETECTDOCUMENTTEXTREQUEST']._serialized_start=64
  _globals['_DETECTDOCUMENTTEXTREQUEST']._serialized_end=176
  _globals['_DETECTDOCUMENTTEXTRESPONSE']._serialized_start=178
  _globals['_DETECTDOCUMENTTEXTRESPONSE']._serialized_end=206
  _globals['_DOCUMENTOCRSERVICE']._serialized_start=209
  _globals['_DOCUMENTOCRSERVICE']._serialized_end=358
# @@protoc_insertion_point(module_scope)
