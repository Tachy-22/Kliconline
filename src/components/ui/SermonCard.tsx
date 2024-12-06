"use client";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import React, { useRef } from "react";
// remove Download import since we won't use it
//import { Download } from "lucide-react";

const SermonCard: React.FC<SermonT> = ({
  title,
  description,
  date,
  preacher,
  audioUrl,
  category,
  // times = [],
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Remove handleDownload function since we won't need it

  // Convert Firebase timestamp or Date object to Date
  const sermonDate = formatToMonthDayYear(date);

  return (
    <div className="bg-[#FFF5EB] group overflow-hidden shadow rounded-lg p-3 lg:px-[2rem] py-[2rem] w-full flex flex-col justify-between min-h-full h-full relative gap-6">
      <div className="flex flex-col justify-end items-end font-semibold text-lg uppercase w-full !text-black">
        {sermonDate}
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

      <audio
        ref={audioRef}
        controls
        className="w-full focus:outline-none rounded-full [&::-webkit-media-controls-panel]:bg-orange-50 border border-orange-800 [&::-webkit-media-controls-current-time-display]:text-black [&::-webkit-media-controls-time-remaining-display]:text-black h-[3rem]"
        preload="metadata"
      >
        <source
          className="w-full focus:outline-none   rounded-lg"
          src={audioUrl}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Remove the form and button */}

      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 left-0 transition-all duration-300"></div>
    </div>
  );
};

export default SermonCard;
