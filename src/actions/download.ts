"use server";

export async function downloadSermon(audioUrl: string, title: string) {
  try {
    const response = await fetch(audioUrl);
    if (!response.ok) throw new Error("Download failed");

    // Convert the response to a blob and prepare it for download
    const blob = await response.blob();
    return { ok: true, blob, filename: `${title.replace(/\s+/g, "_")}.mp3` };
  } catch (error) {
    console.error("Download failed:", error);
    return { ok: false, error: "Download failed" };
  }
}
