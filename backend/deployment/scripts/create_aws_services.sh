#!/bin/bash
awslocal sqs create-queue --queue-name "$OCR_QUEUE_NAME"
awslocal sqs create-queue --queue-name "$CLASSIFIER_QUEUE_NAME"
