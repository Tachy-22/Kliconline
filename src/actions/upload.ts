"use server";

import fs from "fs-extra";
import path from "path";

const BASE_UPLOAD_DIR = "/home/kliconlinemedia@gmail.com/public_html/uploads/sermon/"; // Update this!
const BASE_URL = "https://kliconline.org/uploads/sermon"; // Ensure this points to the correct directory

// Ensure the uploads directory exists
fs.ensureDirSync(BASE_UPLOAD_DIR);

interface UploadParams {
  buffer: ArrayBuffer;
  filename: string;
  contentType: string;
}

export async function uploadFile(
  params: UploadParams
): Promise<{ url: string; error?: never } | { url?: never; error: string }> {
  try {
    const { buffer, filename } = params;

    if (!buffer || !filename) return { error: "No file uploaded" };

    // Generate a unique filename
    const timestamp = Date.now();
    const extension = path.extname(filename);
    const safeName = filename.replace(/[^a-zA-Z0-9]/g, "-").split(".")[0];
    const uniqueFilename = `${safeName}-${timestamp}${extension}`;

    const filePath = path.join(BASE_UPLOAD_DIR, uniqueFilename);
    const publicUrl = `${BASE_URL}/${uniqueFilename}`;

    // Save file to storage
    await fs.writeFile(filePath, Buffer.from(buffer));

    return { url: publicUrl };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Upload failed" };
  }
}
