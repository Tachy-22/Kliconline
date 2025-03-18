// "use sever";
// export default async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end(); // Handle preflight request
//   }

//   const { filename } = req.query; // Get the dynamic file name

//   if (!filename) {
//     return res.status(400).json({ error: "Filename parameter is required" });
//   }

//   const s3Url = `https://klicbucket.s3.us-east-1.amazonaws.com/uploads/${filename}`;

//   try {
//     const response = await fetch(s3Url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "audio/mpeg",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch the file");
//     }

//     const buffer = await response.arrayBuffer();
//     res.setHeader("Content-Type", "audio/mpeg");
//     res.status(200).send(Buffer.from(buffer));
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching from S3", details: error });
//   }
// }



"use server";

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    console.log("Debug: Received POST request");

    // Read the form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(
      `data:audio/mpeg;base64,${base64File}`,
      {
        resource_type: "auto",
        folder: "uploads", // Stores files inside the "uploads" folder
      }
    );

    console.log("Debug: File uploaded ->", result.secure_url);

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

