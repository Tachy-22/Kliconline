"use server";

import cloudinary from "@/lib/cloudinary";

interface UploadParams {
  buffer: ArrayBuffer;
  filename: string;
  folder?: string; // Optional: specify a folder in Cloudinary
  contentType?: string
}

export async function uploadToCloudinary(
  params: UploadParams
): Promise<{ url: string; error?: never } | { url?: never; error: string }> {
  try {
    const { buffer, filename, folder } = params;

    if (!buffer || !filename) return { error: "No file provided" };

    // Convert ArrayBuffer to Buffer
    const fileBuffer = Buffer.from(buffer);

    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folder || "uploads",
          public_id: filename,
        },
        (error, result) => {
          if (error) {
            resolve({ error: error.message || "Upload failed" });
          } else if (!result) {
            resolve({ error: "No response from Cloudinary" });
          } else {
            resolve({ url: result.secure_url });
          }
        }
      );

      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Upload failed" };
  }
}
