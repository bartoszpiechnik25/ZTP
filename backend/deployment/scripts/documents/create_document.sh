#!/bin/bash

API_URL="http://localhost:2137/document"
LOGIN_ENDPOINT="http://localhost:2137/login"
TITLE="Quarterly Report"
NOTES="Scanned from original documents"
DOC_TYPE="Report"
DOC_CATEGORY="Legal"
USERNAME="alice"
PASSWORD="hashedpassword1"

IMAGES=("page1.jpg" "page2.png")

echo "Logging in as $USERNAME..."

LOGIN_RESPONSE=$(curl -s -X POST "$LOGIN_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [[ "$TOKEN" == "null" || -z "$TOKEN" ]]; then
  echo "Failed to retrieve token. Response was:"
  echo "$LOGIN_RESPONSE"
  exit 1
fi

echo "Token retrieved successfully."

build_pages_json() {
  local pages=()
  local page_number=1

  for img in "${IMAGES[@]}"; do
    if [[ ! -f "$img" ]]; then
      echo "File not found: $img"
      exit 1
    fi

    local content_type
    case "$img" in
      *.png) content_type="image/png" ;;
      *.jpg|*.jpeg) content_type="image/jpeg" ;;
      *) echo "Unsupported image format: $img"; exit 1 ;;
    esac

    local b64data
    b64data=$(base64 < "$img" | tr -d '\n')

    local page_json
    page_json=$(jq -n \
      --argjson page_number "$page_number" \
      --arg content_type "$content_type" \
      --arg document_content "$b64data" \
      '{
        page_number: $page_number,
        content_type: $content_type,
        document_content: $document_content
      }')

    pages+=("$page_json")
    ((page_number++))
  done

  printf '[%s]\n' "$(IFS=,; echo "${pages[*]}")"
}

document_pages_json=$(build_pages_json)

# Build payload string manually
read -r -d '' payload <<EOF
{
  "title": "$TITLE",
  "notes": "$NOTES",
  "document_type": "$DOC_TYPE",
  "document_category": "$DOC_CATEGORY",
  "document_pages": $document_pages_json
}
EOF

# Submit the document
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}\n" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "$payload")

echo "$RESPONSE"
