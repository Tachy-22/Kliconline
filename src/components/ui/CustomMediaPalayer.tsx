"use client"

import {  FastForward, Maximize2, Minimize2, Pause, Play, Repeat, Rewind, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CustomMediaPlayerProps {
  onClose: () => void;
  trackList: SermonT[];
  currentTrackIndex: number;
  onChangeTrackIndex: (idx: number) => void;
}

const CustomMediaPlayer = ({
  onClose,
  trackList,
  currentTrackIndex,
  onChangeTrackIndex,
}: CustomMediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * trackList.length);
      onChangeTrackIndex(randomIndex);
    } else {
      const nextIndex = (currentTrackIndex + 1) % trackList.length;
      onChangeTrackIndex(nextIndex);
    }
  };

  useEffect(() => {
    const currentSermon = trackList[currentTrackIndex];
    if (audioRef.current && currentSermon?.audioUrl) {
      audioRef.current.src = currentSermon.audioUrl;
    }
  }, [currentTrackIndex, trackList]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (isLoop) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      } else {
        handleNext();
      }
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLoop, handleNext]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;

    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const percentClicked = clickPosition / progressRect.width;
    const newTime = percentClicked * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentTrackIndex - 1 + trackList.length) % trackList.length;
    onChangeTrackIndex(prevIndex);
  };

  const handleJumpForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const handleJumpBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const handleSpeedChange = () => {
    if (!audioRef.current) return;
    const speeds = [1, 1.5, 2, 0.5, 0.75];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    
    setPlaybackSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed;
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [currentTrackIndex, playbackSpeed]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const remainingTime = duration - currentTime;

  const currentSermon = trackList[currentTrackIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
      <div
        onClick={onClose}
        className="inset-0 absolute top-0 w-full h-full bg-blue-600/20 cursor-pointer"
      ></div>
      <div 
        ref={playerRef}
        className={`bg-black rounded-lg overflow-hidden shadow-xl z-20 ${
          isFullScreen ? "fixed inset-0 max-w-full rounded-none" : "max-w-sm w-full"
        }`}
      >
        {/* Cover Image */}
        <div className="relative">
          <img
            src={currentSermon?.thumbnailUrl || "/klic-logo.jpg"}
            alt={currentSermon?.title || ""}
            className={`w-full object-cover ${isFullScreen ? "h-[70vh]" : "h-80"}`}
          />

          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Media Info */}
        <div className="p-4 bg-black text-white">
          <div className="mb-2 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl truncate">
                {currentSermon?.title}
              </h3>
              <p className="text-gray-400 text-sm">{currentSermon?.preacher}</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleFullScreen} 
                className="text-gray-400 hover:text-white ml-2"
              >
                {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="h-1 bg-gray-700 rounded-full my-4 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remainingTime)}</span>
          </div>

          {/* Playback Speed */}
          <div className="flex justify-center mb-3">
            <button 
              onClick={handleSpeedChange} 
              className="text-gray-400 hover:text-white px-2 py-1 rounded text-xs bg-gray-800"
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <button
              className={isShuffle ? "text-indigo-500" : "text-gray-400"}
              onClick={() => setIsShuffle(!isShuffle)}
            >
              <Shuffle className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                className="text-white hover:text-white/80"
                onClick={handlePrev}
              >
                <SkipBack className="h-6 w-6" />
              </button>

              <button
                className="text-white hover:text-white/80"
                onClick={handleJumpBackward}
              >
                <Rewind className="h-5 w-5" />
              </button>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3"
                onClick={handleTogglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>

              <button
                className="text-white hover:text-white/80"
                onClick={handleJumpForward}
              >
                <FastForward className="h-5 w-5" />
              </button>

              <button
                className="text-white hover:text-white/80"
                onClick={handleNext}
              >
                <SkipForward className="h-6 w-6" />
              </button>
            </div>

            <button
              className={isLoop ? "text-indigo-500" : "text-gray-400"}
              onClick={() => setIsLoop(!isLoop)}
            >
              <Repeat className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};

export default CustomMediaPlayer;