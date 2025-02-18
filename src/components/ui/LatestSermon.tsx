"use client";

import formatToMonthDayYear, { formatTime } from "@/lib/formatToMonthDayYear";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";

const LatestSermon = ({ sermons }: { sermons: SermonT[] }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("canplay", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("canplay", updateDuration);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = latestSermon.audioUrl;
    link.download = "sermon_audio.mp3";
    link.click();
  };

  const getLatestSermon = () => {
    const today = new Date();
    return sermons.reduce((closest, blog) => {
      const blogDate = new Date(blog.date); // Assumes `blog.date` is an ISO string or valid date format
      const closestDate = new Date(closest.date);

      const diffCurrent = Math.abs(today.getTime() - blogDate.getTime());
      const diffClosest = Math.abs(today.getTime() - closestDate.getTime());

      return diffCurrent < diffClosest ? blog : closest;
    }, sermons[0]);
  };

  const latestSermon = getLatestSermon();
  //console.log({ latestSermon });

  if (!latestSermon) {
    return <p>No sermons available.</p>;
  }

  const { date } = latestSermon;

  // Convert Firebase timestamp or Date object to Date
  const sermonDate = formatToMonthDayYear(date);

  return (
    <section className="bg-gray-50 py-16 flex flex-col gap-[3rem]">
      <div className="text-center flex flex-col gap-3">
        <p className="text-lg uppercase text-gray-600">LATEST SERMON</p>
        <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase lg:max-w-[30rem] ">
          Download and Listen to Our Latest Sermon
        </h2>
      </div>
      <div className="max-w-7xl mx-auto w-full gap flex flex-col lg:flex-row items-center justify-between lg:h-[25rem]">
        <div className="bg-[#FFF5EB] rounded-lg p-3 lg:px-[3rem] py-[2rem] w-full lg:w-1/3 flex flex-col justify-between min-h-full h-full relative gap-6">
          <div className="flex flex-col justify-end items-end font-semibold text-lg uppercase w-full !text-black">
            {sermonDate}
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
            src={latestSermon.audioUrl}
            className="hidden"
          />
          <div className="flex items-center gap-2">
            <button onClick={handlePlayPause}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="cursor-pointer w-full accent-yellow-500"
            />
            <span className="text-sm text-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button onClick={handleDownload}>
              <Download />
            </button>
          </div>
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
    </section>
  );
};

export default LatestSermon;
