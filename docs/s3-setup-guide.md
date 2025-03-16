# S3 Bucket Configuration Guide

To ensure file uploads work properly in both development and production environments, follow these steps:

## 1. Configure CORS for your S3 bucket

1. Go to your AWS S3 console
2. Select the bucket `klicbucket`
3. Go to "Permissions" tab
4. Scroll down to "Cross-origin resource sharing (CORS)"
5. Click "Edit" and paste the following configuration:

```json
{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedOrigins": [
        "http://localhost:3000", 
        "https://kliconline.org"
      ],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

7. Click "Save changes"

## 2. Check IAM Permissions

Ensure your IAM user has these permissions:
- s3:PutObject
- s3:GetObject
- s3:PutObjectAcl

## 3. Verify Environment Variables

Ensure both development and production environments have these environment variables set correctly:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_S3_BUCKET
- AWS_REGION
- AWS_S3_ACL
- S3_UPLOAD_MAX_SIZE
- NEXT_PUBLIC_S3_UPLOAD_MAX_SIZE

## 4. Testing Upload Functionality

1. Try uploading a small file first (< 1MB)
2. Check browser network tab for any CORS errors
3. If errors persist, enable detailed logging in the uploadFile function
