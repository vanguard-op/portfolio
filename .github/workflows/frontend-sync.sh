#!/bin/bash
echo "Install dependencies"
npm install
echo "Build project"
npm run build
echo "Deploy to s3 bucket"
aws s3 sync ./out/ "s3://$USER_INTERFACE_BUCKET" --delete
