CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO document_types (id, name)
    VALUES ('a3f1c5c2-1a4f-4ad6-8a18-2d4709c65412', 'Invoice'),
    ('bdfd79b0-05c9-43cb-92b2-9b2e49a80375', 'Receipt'),
    ('e6a29e2e-5f3f-4e17-b2ed-486d471107cc', 'Contract'),
    ('3fc042a7-f013-4a6a-bf1c-79ebc91e8a35', 'Purchase Order'),
    ('41a7fc09-8c6c-4087-b5f9-201bd8f9053d', 'Delivery Note'),
    ('d35fc4a9-1f50-4045-8db2-23b8c82b3bd9', 'Quotation'),
    ('7cb91a19-6a90-4ae1-9ed0-8d994f6d1098', 'Credit Note'),
    ('6a2cb9e8-9f5a-4704-b460-2588f1c0db48', 'Timesheet'),
    ('c03a5046-f6e7-47ef-8438-50db16bb05d6', 'Report'),
    ('8df2c4ae-c6a3-4494-a9ec-538eb47123d1', 'Memo');

INSERT INTO document_tags (id, name)
    VALUES ('9d5c5e1a-8720-4a19-9ad3-3e8848f8c915', 'Urgent'),
    ('4f3c3b6d-57fc-4c52-804f-50f3e58eaaaf', 'Confidential'),
    ('61de1fc0-2b8d-4b30-91aa-067a7f2a1e48', 'Finance'),
    ('cbaf3a0b-57c1-4b2f-925e-7d2cbf78cc57', 'HR'),
    ('f9bc44c2-cc06-4e95-8a28-654d9a78c4a6', 'Legal'),
    ('c4b8a2f5-3820-41cc-9cb4-17385a7d2a67', 'Internal'),
    ('19b7ec37-f32e-4d20-a6b4-89e6b0c23a4f', 'External'),
    ('bd024e2a-49b6-40f5-a39c-7a91b0cb3129', 'Reviewed'),
    ('2b7d3e3d-951a-41d4-8f2b-b51f1261f7a4', 'Draft'),
    ('87e3a6c3-394e-44f5-bad4-674af65844a1', 'Approved');

INSERT INTO document_categories (id, name)
    VALUES ('6bdf7a38-81aa-4f6f-bc39-12fd37902888', 'Financial'),
    ('adf87c5a-47f4-4a52-90c2-bd76d2e0be76', 'Legal'),
    ('3e2a46f2-40b6-4b26-9f18-3b3e3ccf1393', 'Human Resources'),
    ('74d5e46f-6ee8-46c1-bcfa-859b0b8baf9d', 'Operations'),
    ('1a37594e-bd0d-4205-a6e5-95e3e7129633', 'Sales'),
    ('f97fd786-3389-41a4-a195-c4f22f86f5c9', 'Marketing'),
    ('bb2f4f89-3ae0-4df7-b589-d4e9c49d1d64', 'Customer Service'),
    ('a8d7c49b-8ac9-4bc5-974f-9c080c06d73e', 'IT & Security'),
    ('30f4f7a2-1124-417c-8c8e-1667506f1d1a', 'Procurement'),
    ('e7dabc1a-0018-4983-97cb-8cf2a2c77be3', 'Administration');

