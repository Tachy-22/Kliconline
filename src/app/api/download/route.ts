import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: NextRequest) {
  console.log("Download API route called");
  
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  console.log("Requested file URL:", url);

  if (!url) {
    console.error("Error: Missing file URL parameter");
    return NextResponse.json({ error: "Missing file URL" }, { status: 400 });
  }

  try {
    console.log("Fetching file from source URL");
    // Fetch the file from S3
    const response = await fetch(url);

    console.log("Fetch response status:", response.status);
    
    if (!response.ok) {
      console.error(`Error fetching file: ${response.statusText}`);
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get the filename from the URL
    const filename = url.split("/").pop() || "download.mp3";
    console.log("Generated filename:", filename);

    // Convert the response to a buffer
    console.log("Converting response to buffer");
    const fileBuffer = await response.buffer();
    console.log("Buffer size:", fileBuffer.length, "bytes");

    // Create response headers
    const headers = {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/octet-stream",
      "Content-Length": fileBuffer.length.toString(),
    };
    
    console.log("Response headers:", headers);

    // Create a new response with proper headers
    const downloadResponse = new NextResponse(fileBuffer, { headers });
    console.log("Download response created");

    return downloadResponse;
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
