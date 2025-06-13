#!/bin/bash

# Test script for delete endpoint with proper document creation
API_URL="http://localhost:2137"
LOGIN_ENDPOINT="$API_URL/login"
USERNAME="alice"
PASSWORD="hashedpassword1"

echo "=== Testing Document Delete Endpoint (Fixed) ==="
echo

# Login to get token
echo "1. Logging in as $USERNAME..."
LOGIN_RESPONSE=$(curl -s -X POST "$LOGIN_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [[ "$TOKEN" == "null" || -z "$TOKEN" ]]; then
  echo "❌ Failed to retrieve token. Response was:"
  echo "$LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Token retrieved successfully."
echo

# Create a test document first
echo "2. Creating a test document..."
CREATE_PAYLOAD='{
  "title": "Test Delete Document",
  "notes": "This document will be deleted",
  "document_type": "Report",
  "document_category": "Legal",
  "document_pages": [
    {
      "page_number": 1,
      "content_type": "text/plain",
      "document_content": "VGVzdCBjb250ZW50IGZvciBkZWxldGUgdGVzdA=="
    }
  ]
}'

CREATE_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}\n" -X POST "$API_URL/document" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "$CREATE_PAYLOAD")

echo "Create Response: $CREATE_RESPONSE"
echo

# Get all documents to find our test document
echo "3. Getting all user documents to find our test document..."
DOCS_RESPONSE=$(curl -s -X GET "$API_URL/user/documents" \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $DOCS_RESPONSE"
echo

# Extract the test document ID
DOCUMENT_ID=$(echo "$DOCS_RESPONSE" | jq -r '.documents[] | select(.title == "Test Delete Document") | .id')

if [[ -n "$DOCUMENT_ID" && "$DOCUMENT_ID" != "null" ]]; then
  echo "Found test document with ID: $DOCUMENT_ID"
  echo
  
  echo "4. Testing GET /document/{id} (get specific document)..."
  DOCUMENT_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}\n" -X GET "$API_URL/document/$DOCUMENT_ID" \
    -H "Authorization: Bearer $TOKEN")
  
  echo "Response: $DOCUMENT_RESPONSE"
  echo
  
  echo "5. Testing DELETE /document/{id} (delete document)..."
  DELETE_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}\n" -X DELETE "$API_URL/document/$DOCUMENT_ID" \
    -H "Authorization: Bearer $TOKEN")
  
  echo "Response: $DELETE_RESPONSE"
  echo
  
  # Verify document was deleted
  echo "6. Verifying document was deleted..."
  VERIFY_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}\n" -X GET "$API_URL/document/$DOCUMENT_ID" \
    -H "Authorization: Bearer $TOKEN")
  
  echo "Response: $VERIFY_RESPONSE"
  echo
  
  # Check that document is no longer in the list
  echo "7. Checking document is no longer in user documents list..."
  FINAL_DOCS_RESPONSE=$(curl -s -X GET "$API_URL/user/documents" \
    -H "Authorization: Bearer $TOKEN")
  
  echo "Final documents: $FINAL_DOCS_RESPONSE"
  
  # Verify the document is not in the list
  DELETED_CHECK=$(echo "$FINAL_DOCS_RESPONSE" | jq -r '.documents[] | select(.id == "'$DOCUMENT_ID'") | .id // empty')
  
  if [[ -z "$DELETED_CHECK" ]]; then
    echo "✅ Document successfully deleted and no longer appears in user documents list"
  else
    echo "❌ Document still appears in user documents list"
  fi
  
else
  echo "❌ Could not find test document for deletion testing"
fi

echo
echo "=== Test Complete ==="
