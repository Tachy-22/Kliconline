"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename parameter is required" },
        { status: 400 }
      );
    }

    // Cloudinary public URL
    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/v1698232305/uploads/${filename}`;

    const response = await fetch(cloudinaryUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("Error fetching from Cloudinary:", error);
    return NextResponse.json({ error: "Error fetching file" }, { status: 500 });
  }
}
