"use client";
import React from "react";
import { Button } from "./button";
import { Download } from "lucide-react";

interface SermonCardProps {
  type: string;

  title: string;
  description: string;
  date: Date;
  times: string[];
  location: string;
}

const SermonCard: React.FC<SermonCardProps> = ({
  type,
  title,
  description,
  date,
  times,
  location,
}) => {

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long", // Options: 'long' (e.g., "November"), 'short' (e.g., "Nov"), or 'narrow' (e.g., "N")
});
const dayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit", // Options: 'long' (e.g., "November"), 'short' (e.g., "Nov"), or 'narrow' (e.g., "N")
});
const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
});
  return (
    <div className="bg-[#FFF5EB] group overflow-hidden shadow rounded-lg pt-2 px-[2rem] pb-[4rem] w-full  flex flex-col justify-between min-h-full h-full relative gap-6">
      <div className="flex flex-col justify-end items-end font-semibold text-lg  uppercase w-full">
        <span className="font-bold">{dayFormatter.format(date)}</span>{" "}
        <span>{monthFormatter.format(date)}, {yearFormatter.format(date)}</span>{" "}
      </div>
      <div className="text-sm text-orange-600 uppercase font-medium">
        {type}
      </div>
      <div className="flex items-center gap-2">
        <div className="gap-3 flex flex-col ">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {/* Time and Location */}
        <div className="flex items-start gap-3 text-gray-800 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m7-9a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex flex-col items-start gap-2">
            {times.map((time, index) => (
              <span key={index}>{time}</span>
            ))}
          </div>
        </div>
        <div className="flex items-start  gap-3 text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m4-5a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
          <span>{location}</span>
        </div>
      </div>
      <Button className="bg-black text-[#FFD2A4] hover:bg-black/90 rounded-xl p-6">
        Download
        <Download />
      </Button>
      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0  left-0 transition-all duration-300"></div>
    </div>
  );
};

export default SermonCard;
