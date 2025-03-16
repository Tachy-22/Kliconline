"use client";
//import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import React, { useRef } from "react";

const SermonCard: React.FC<SermonT> = ({
  title,
  description,
 //date,
  preacher,
  audioUrl,
  category,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

 // const sermonDate = formatToMonthDayYear(date);

  return (
    <div className="bg-yellow-100/50 group overflow-hidden shadow-lg hover:shadow-xl  rounded-[0.5rem] p-3 lg:px-[2rem] py-[2rem] w-full flex flex-col justify-between min-h-full h-full relative gap-6 transition-all">
      {/* <div className="flex flex-col justify-end items-end font-semibold text-lg uppercase w-full !text-black">
        {sermonDate}
      </div> */}
      <div className="text-sm text-orange-600 uppercase font-medium">
        {category === "IDBS Service" ? "online IDBS Service" : category}
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
        src={audioUrl}
        controls
        className="w-full h-10 rounded-md bg- focus:ring-yellow-500 accent-yellow-500"
        style={{
          accentColor: "#eab308 ",
        }}
      />

      <div className="w-full h-3 bg-yellow-300 absolute bottom-0 left-0 transition-all duration-300"></div>
    </div>
  );
};

export default SermonCard;
