"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const ViewSermons = ({ sermons }: { sermons: SermonT[] }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const getLatestSermon = () => {
    const today = new Date();
    return sermons.reduce((closest, sermon) => {
      const sermonDate =
        "seconds" in sermon.date
          ? new Date(sermon.date.seconds * 1000)
          : new Date(sermon.date);

      const closestDate =
        "seconds" in closest.date
          ? new Date(closest.date.seconds * 1000)
          : new Date(closest.date);

      const diffCurrent = Math.abs(today.getTime() - sermonDate.getTime());
      const diffClosest = Math.abs(today.getTime() - closestDate.getTime());

      return diffCurrent < diffClosest ? sermon : closest;
    }, sermons[0]);
  };

  const latestSermon = getLatestSermon();
  console.log({ latestSermon });

  if (!latestSermon) {
    return <p>No sermons available.</p>;
  }

  const { date } = latestSermon;

  // Convert Firebase timestamp or Date object to Date
  const sermonDate =
    "seconds" in date ? new Date(date.seconds * 1000) : new Date(date);

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
    <section className="bg-gray-50 py-16 flex flex-col gap-[3rem]">
      <div className="text-center flex flex-col gap-3">
        <p className="text-lg uppercase text-gray-600">LATEST SERMON</p>
        <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase max-w-[30rem]">
          Download and Listen to Our Latest Sermon
        </h2>
      </div>
      <div className="max-w-7xl mx-auto w-full gap flex flex-col lg:flex-row items-center justify-between lg:h-[25rem]">
        <div className="bg-[#FFF5EB] rounded-lg p-6 px-[3rem] py-[2rem] w-full lg:w-1/3 flex flex-col justify-between min-h-full h-full relative gap-6">
          <div className="flex flex-col justify-end items-end font-semibold text-lg uppercase w-full !text-black">
            <span className="font-bold">{dayFormatter.format(sermonDate)}</span>
            <span>
              {monthFormatter.format(sermonDate)},{" "}
              {yearFormatter.format(sermonDate)}
            </span>
          </div>

          <div className="text-sm text-orange-600 uppercase font-medium">
            {latestSermon.category}
          </div>

          <div className="gap-3 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">
              {latestSermon.title}
            </h3>
            <p className="text-gray-500">{latestSermon.description}</p>
            <p className="text-gray-600 italic">
              Speaker: {latestSermon.preacher}
            </p>
          </div>

          <audio
            ref={audioRef}
            controls
            className="w-full focus:outline-none rounded-full [&::-webkit-media-controls-panel]:bg-orange-50 border border-orange-800/50 [&::-webkit-media-controls-current-time-display]:text-black [&::-webkit-media-controls-time-remaining-display]:text-black"
            preload="metadata"
          >
            <source
              className="w-full focus:outline-none rounded-lg"
              src={latestSermon.audioUrl}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="relative w-full lg:w-2/3 lg:min-h-full lg:h-full h-fit">
          <Image
            src={latestSermon.thumbnailUrl || "/sermon-img.svg"}
            alt={latestSermon.title}
            width={2000}
            height={1000}
            className="rounded-lg object-cover w-full h-full bg-gray-300"
          />
        </div>
      </div>

      <div className="text-right max-w-7xl w-full mx-auto p-4">
        <Link
          href="/sermons"
          className="text-black hover:text-orange-600 text-sm font-medium hover:underline flex items-center justify-end gap-1"
        >
          View all Sermons
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default ViewSermons;
