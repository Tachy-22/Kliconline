"use server";

import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_MIME_TYPES = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/gif": ["gif"],
  "application/pdf": ["pdf"],
  "audio/mpeg": ["mp3"],
  "audio/wav": ["wav"],
  // Add more MIME types as needed
};

interface UploadParams {
  buffer: ArrayBuffer;
  filename: string;
  contentType: string;
}

function getFileExtension(filename: string, contentType: string): string {
  const fileExt = filename.split(".").pop()?.toLowerCase();
  const allowedExts =
    ALLOWED_MIME_TYPES[contentType as keyof typeof ALLOWED_MIME_TYPES];
  if (fileExt && allowedExts?.includes(fileExt)) return fileExt;
  return allowedExts?.[0] || "bin";
}

function generateUniqueFilename(
  originalFilename: string,
  contentType: string
): string {
  const hash = crypto
    .createHash("sha256")
    .update(originalFilename + process.hrtime.bigint().toString())
    .digest("hex")
    .slice(0, 8);
  const extension = getFileExtension(originalFilename, contentType);
  const baseName = originalFilename.split(".")[0].replace(/[^a-zA-Z0-9]/g, "-");
  return `${baseName}-${hash}.${extension}`;
}

export async function uploadFile(
  params: UploadParams
): Promise<{ url: string; error?: never } | { url?: never; error: string }> {
  try {
    // Validate content type
    if (
      !ALLOWED_MIME_TYPES[params.contentType as keyof typeof ALLOWED_MIME_TYPES]
    ) {
      return { error: "File type not supported" };
    }

    const uniqueFilename = generateUniqueFilename(
      params.filename,
      params.contentType
    );
    const key = `uploads/${uniqueFilename}`;
    const buffer = Buffer.from(params.buffer);

    // **Use simple upload if file is 5MB or less**
    if (buffer.byteLength <= 5 * 1024 * 1024) {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: params.contentType,
        Metadata: { originalName: params.filename },
      });

      await s3.send(command);
    } else {
      // **Use multipart upload for large files**
      const createCommand = new CreateMultipartUploadCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        ContentType: params.contentType,
      });

      const { UploadId } = await s3.send(createCommand);
      if (!UploadId) return { error: "Multipart upload initialization failed" };

      const partSize = 5 * 1024 * 1024; // 5MB
      const totalParts = Math.ceil(buffer.byteLength / partSize);
      const parts = [];

      for (let i = 0; i < totalParts; i++) {
        const start = i * partSize;
        const end = Math.min(start + partSize, buffer.byteLength);
        const partBuffer = buffer.slice(start, end);

        const uploadPartCommand = new UploadPartCommand({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: key,
          UploadId,
          PartNumber: i + 1,
          Body: partBuffer,
        });

        const { ETag } = await s3.send(uploadPartCommand);
        if (!ETag) return { error: "Error uploading part" };

        parts.push({ ETag, PartNumber: i + 1 });
      }

      const completeCommand = new CompleteMultipartUploadCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: key,
        UploadId,
        MultipartUpload: { Parts: parts },
      });

      await s3.send(completeCommand);
    }

    return { url: `${process.env.CLOUD_FRONT_URL}/${key}` };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Upload failed" };
  }
}
