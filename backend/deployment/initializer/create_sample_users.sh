#!/bin/bash

# Fail on error
set -e

API_URL="http://server:2137/user/create"

echo "Waiting for server to start"

sleep 3

echo "Creating users..."

# User 1 - Alice
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "surname": "Smith",
    "username": "alice",
    "password": "hashedpassword1",
    "email": "alice@example.com",
    "phone_number": "1234567890",
    "role": "admin"
  }'

echo -e "\nCreated user: alice"

# User 2 - Bob
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob",
    "surname": "Jones",
    "username": "bob",
    "password": "hashedpassword2",
    "email": "bob@example.com",
    "phone_number": "0987654321",
    "role": "user"
  }'

echo -e "\nCreated user: bob"
