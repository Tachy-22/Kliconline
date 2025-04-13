"use client";
import { useState } from "react";
import {
  FileAudio,
  Youtube,
  ArrowRight,
  Download,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import CustomMediaPlayer from "../ui/CustomMediaPalayer";

function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}) {
  if (!isOpen) return null;

  // Convert standard YouTube URLs to embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    // Return original URL if not YouTube or already in embed format
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        onClick={onClose}
        className="inset-0 absolute top-0 w-full h-full bg-blue-600/20 cursor-pointer"
      ></div>
      <div className="bg-black rounded-lg overflow-hidden max-w-4xl w-full shadow-xl z-[60]">
        <div className="p-4 flex justify-between items-center bg-gray-900">
          <h3 className="text-white font-bold truncate">{title}</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            &times;
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}

function SermonsSection({
  sermons,
  events,
}: {
  sermons: SermonT[];
  events: EventT[];
}) {
  const [selectedMedia, setSelectedMedia] = useState<{
    title: string;
    artist: string;
    coverImage: string;
    audioSrc?: string;
    videoSrc?: string;
  } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [trackList, setTrackList] = useState<SermonT[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);

  const handleOpenMedia = (
    item: {
      type: "audio" | "youtube" | "mixlr";
      title: string;
      artist: string;
      image: string;
      audioUrl?: string;
      videoUrl?: string;
    },
    index: number
  ) => {
    if (item.type === "youtube" && item.videoUrl) {
      // For YouTube, show in modal
      setSelectedVideo({
        url: item.videoUrl,
        title: item.title,
      });
    } else if (item.type === "mixlr" && item.audioUrl) {
      // For Mixlr, open in a new tab
      window.open(item.audioUrl, "_blank");
    } else {
      // For audio, use the custom player
      setTrackList(sermons.filter((sermon) => sermon.audioUrl));
      setCurrentTrackIndex(index);
      setSelectedMedia({
        title: item.title,
        artist: item.artist,
        coverImage: item.image,
        audioSrc: item.audioUrl,
        videoSrc: item.videoUrl,
      });
    }
  };

  const handleDownload = async (audioUrl?: string) => {
    if (!audioUrl) {
      console.error("Download error: No audio URL provided");
      return;
    }

    // Set loading state for this specific URL
    setDownloadingUrl(audioUrl);
    console.log("Starting download process for:", audioUrl);

    try {
      // Send request to your backend, which fetches the S3 file and forces download headers
      const proxyUrl = `/api/download?url=${encodeURIComponent(audioUrl)}`;
      console.log("Proxy URL created:", proxyUrl);

      console.log("Creating anchor element for download");
      const link = document.createElement("a");
      link.href = proxyUrl;
      link.download = audioUrl.split("/").pop() || "track.mp3";
      console.log("Download filename:", link.download);

      console.log("Appending link to document body");
      document.body.appendChild(link);

      console.log("Triggering click on download link");
      link.click();

      console.log("Removing link from document body");
      document.body.removeChild(link);

      console.log("Download process completed");
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      // Clear loading state
      setDownloadingUrl(null);
    }
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

  const getSermonType = (sermon: SermonT) => {
    if (sermon.videoUrl) return "youtube";
    if (sermon.audioUrl) return "audio";
    return "mixlr";
  };

  const getEventType = (event: EventT) => {
    if (event.mediaUrl?.includes("youtube")) return "youtube";
    if (event.mediaUrl?.includes("mixlr")) return "mixlr";
    return "audio";
  };

  function SermonCard({
    title,
    pastor,
    date,
    type,
    image,
    audioUrl,
    videoUrl,
  }: {
    title: string;
    pastor: string;
    date: string;
    type: "audio" | "youtube" | "mixlr";
    image: string;
    audioUrl?: string;
    videoUrl?: string;
  }) {
    const isDownloading = downloadingUrl === audioUrl;

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative h-48">
          <img
            src={`${image}` || "/klic-logo.jpg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <p className="text-sm text-gray-500 mb-2">
            {date} | {pastor}
          </p>
          <h3 className="font-serif text-xl font-bold mb-3">{title}</h3>
          <Button
            variant="outline"
            className={`mt-2 w-full ${
              type === "youtube"
                ? "border-yellow-500 text-gray-800 hover:bg-yellow-500"
                : type === "mixlr"
                ? "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            }`}
            onClick={() =>
              handleOpenMedia(
                {
                  type,
                  title,
                  artist: pastor,
                  image,
                  audioUrl,
                  videoUrl,
                },
                sermons.findIndex((sermon) => sermon.audioUrl === audioUrl)
              )
            }
          >
            {type === "youtube"
              ? "Watch Video"
              : type === "mixlr"
              ? "Listen Live"
              : "Listen Sermon"}
          </Button>
          {type === "audio" && (
            <Button
              variant="outline"
              className="mt-2 w-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              onClick={() => handleDownload(audioUrl as string)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  Download
                  <Download className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Latest Sermons
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mb-6"></div>
            <p className="text-lg max-w-2xl text-gray-700">
              Listen to our audio sermons or watch our media events to grow in
              your understanding of God&apos;s Word.
            </p>
          </div>
          <Button
            variant="link"
            className="text-indigo-600 hidden md:flex items-center"
            asChild
          >
            <Link href="/sermons">
              View All Sermons <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="mb-8 bg-transparent border-b border-gray-200 w-full justify-start">
            <TabsTrigger
              value="audio"
              className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 py-2"
            >
              <FileAudio className="mr-2 h-4 w-4" /> Audio Sermons
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none px-6 py-2"
            >
              <Youtube className="mr-2 h-4 w-4" /> Media Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="audio">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon, index) => (
                <SermonCard
                  key={index}
                  title={sermon.title}
                  pastor={sermon.preacher}
                  date={sermon.date}
                  type={getSermonType(sermon)}
                  image={sermon.thumbnailUrl}
                  audioUrl={sermon.audioUrl}
                  videoUrl={sermon.videoUrl}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="media">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <SermonCard
                  key={index}
                  title={event.title}
                  pastor={event.description}
                  date={event.date}
                  type={getEventType(event)}
                  image={event.images?.[0] || "/placeholder.svg"}
                  audioUrl={event.mediaUrl}
                  videoUrl={
                    event.mediaUrl?.includes("youtube")
                      ? event.mediaUrl
                      : undefined
                  }
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8 md:hidden">
          <Button
            variant="link"
            className="text-indigo-600 flex items-center mx-auto"
            asChild
          >
            <Link href="/sermons">
              View All Sermons <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Render the custom media player if we have selected media */}
      {selectedMedia && (
        <CustomMediaPlayer
          trackList={trackList}
          currentTrackIndex={currentTrackIndex}
          onChangeTrackIndex={setCurrentTrackIndex}
          onClose={handleCloseMedia}
        />
      )}

      {/* Display video modal when a video is selected */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
}

export default SermonsSection;
