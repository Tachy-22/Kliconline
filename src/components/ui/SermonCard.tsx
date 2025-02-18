"use client";
import formatToMonthDayYear, { formatTime } from "@/lib/formatToMonthDayYear";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";



const SermonCard: React.FC<SermonT> = ({
  title,
  description,
  date,
  preacher,
  audioUrl,
  category,
}) => {
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
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "sermon_audio.mp3";
    link.click();
  };

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

      <audio ref={audioRef} src={audioUrl} className="hidden" />
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
          className="cursor-pointer w-full accent-yellow-500 gutter-yellow-100"
        />
        <span className="text-sm text-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button onClick={handleDownload}>
          <Download />
        </button>
      </div>

      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 left-0 transition-all duration-300"></div>
    </div>
  );
};

export default SermonCard;
