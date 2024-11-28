"use client";
import React from "react";
import { Download } from "lucide-react";
//import { download } from "@/actions/download";
import SubmitButton from "./SubmitButton";
import { downloadSermon } from "@/actions/download";

const SermonCard: React.FC<SermonT> = ({
  title,
  description,
  date,
  preacher,
  audioUrl,
  category,
  // times = [],
}) => {
  const handleDownload = async () => {
    if (!audioUrl) return;

    try {
      const result = await downloadSermon(audioUrl, title);
      if (!result.ok) throw new Error(result.error);

      // Create a download link for the blob
      if (!result.blob) throw new Error("Blob is undefined");
      const blobUrl = window.URL.createObjectURL(result.blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = result.filename;

      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Convert Firebase timestamp or Date object to Date
  const sermonDate =
    "seconds" in date ? new Date(date.seconds * 1000) : new Date(date);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formattedDate = formatDate(sermonDate);

  return (
    <div className="bg-[#FFF5EB] group overflow-hidden shadow rounded-lg pt-2 px-[2rem] pb-[4rem] w-full flex flex-col justify-between min-h-full h-full relative gap-6">
      <div className="flex flex-col justify-end items-end font-semibold text-lg uppercase w-full">
        <span>{formattedDate}</span>
      </div>
      <div className="text-sm text-orange-600 uppercase font-medium">
        {category}
      </div>
      <div className="flex items-center gap-2">
        <div className="gap-3 flex flex-col ">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-500">{description}</p>
          <p className="text-gray-600 italic">Speaker: {preacher}</p>
        </div>
      </div>
    
      <form action={handleDownload} className="w-full">
        <SubmitButton
          disabled={!audioUrl}
          className="bg-black flex text-[#FFD2A4] hover:bg-black/90 rounded-xl p-6 w-full items-center"
        >
          Download
          <Download />
        </SubmitButton>
      </form>

      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 left-0 transition-all duration-300"></div>
    </div>
  );
};

export default SermonCard;
