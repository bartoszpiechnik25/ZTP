#!/bin/bash
set -e

echo "Initializing AWS resources in LocalStack..."

export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID:-test}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY:-test}
export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-us-east-1}

echo "Creating SQS queues: $OCR_QUEUE_NAME and $CLASSIFIER_QUEUE_NAME"
awslocal sqs create-queue --queue-name "$OCR_QUEUE_NAME"
awslocal sqs create-queue --queue-name "$CLASSIFIER_QUEUE_NAME"

echo "Creating S3 bucket: ztp-images"
awslocal s3api create-bucket --bucket ztp-images

echo "✅ LocalStack resources created!"
