"use client";
import { useState, useMemo } from "react";
import {
  FileAudio,
  Youtube,
  ArrowRight,
  Search,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/components/ui/tabs";
import Link from "next/link";
import { LatestEventCard } from "@/components/components/events/LatestEventCard";
import CustomMediaPlayer from "@/components/components/ui/CustomMediaPalayer";
import Navbar from "@/components/components/layout/Navbar";
import Footer from "@/components/components/layout/Footer";
import { Input } from "@/components/components/ui/input";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/components/ui/popover";
import { Calendar } from "@/components/components/ui/calendar";
import { cn } from "@/lib/utils";

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

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-black rounded-lg overflow-hidden max-w-4xl w-full shadow-xl">
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

function Sermons({
  sermons,
  events,
}: {
  sermons: SermonT[];
  events: EventT[];
}) {
  const latestEvent = useMemo(() => {
    if (events.length === 0) return null;

    return events.reduce((latest, current) => {
      const latestDate = new Date(latest.date);
      const currentDate = new Date(current.date);
      return currentDate > latestDate ? current : latest;
    }, events[0]);
  }, [events]);

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
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [activeTab, setActiveTab] = useState<"audio" | "media">("audio");

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
      setSelectedVideo({
        url: item.videoUrl,
        title: item.title,
      });
    } else if (item.type === "mixlr" && item.audioUrl) {
      window.open(item.audioUrl, "_blank");
    } else {
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

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch =
      searchTerm === "" ||
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDateRange = true;
    if (dateRange?.from) {
      const sermonDate = new Date(sermon.date);
      matchesDateRange = sermonDate >= dateRange.from;

      if (dateRange.to && matchesDateRange) {
        matchesDateRange = sermonDate <= dateRange.to;
      }
    }

    return matchesSearch && matchesDateRange;
  });

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDateRange = true;
    if (dateRange?.from) {
      const eventDate = new Date(event.date);
      matchesDateRange = eventDate >= dateRange.from;

      if (dateRange.to && matchesDateRange) {
        matchesDateRange = eventDate <= dateRange.to;
      }
    }

    return matchesSearch && matchesDateRange;
  });

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
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="">
        <section className="relative pt-24 pb-12 bg-church-purple text-white ">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-3xl flex flex-col items-center  mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Sermons & Media
              </h1>
              <div className="w-20 h-1 bg-church-yellow mb-6"></div>
              <p className="text-xl opacity-90">
                Watch, listen and be blessed by the Word of God from our
                pastors.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-64 bg-church-yellow opacity-20 rounded-tl-full" />
        </section>
        <div className=" mx-auto    pb-[4rem] w-full ">
          {latestEvent && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Latest Event
                  </h2>
                  <div className="w-20 h-1 bg-church-yellow mb-6"></div>
                  <p className="text-lg max-w-2xl text-gray-700">
                    Don&apos;t miss out on our upcoming special events. Register
                    now to secure your spot!
                  </p>
                </div>

                <LatestEventCard
                  title={latestEvent.title}
                  description={latestEvent.description}
                  date={latestEvent.date}
                  time={latestEvent.time}
                  location={latestEvent.location}
                  image={latestEvent.images?.[0] || ""}
                />
              </div>
            </section>
          )}

          <div className="mb-8 mt-6 container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search by title, preacher..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                    <div className="border-t p-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDateRange(undefined)}
                      >
                        Reset
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {(searchTerm || dateRange?.from) && (
              <div className="mt-4 text-sm text-gray-500">
                Showing{" "}
                {activeTab === "audio"
                  ? filteredSermons.length
                  : filteredEvents.length}{" "}
                results
                {searchTerm && <span> for &quot;{searchTerm}&quot;</span>}
                {dateRange?.from && (
                  <span>
                    {" "}
                    from {format(dateRange.from, "LLL dd, y")}
                    {dateRange.to && ` to ${format(dateRange.to, "LLL dd, y")}`}
                  </span>
                )}
              </div>
            )}
          </div>

          <Tabs
            defaultValue="audio"
            className="w-full container mx-auto px-4 md:px-6"
            onValueChange={(value) => setActiveTab(value as "audio" | "media")}
          >
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
              {filteredSermons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSermons.map((sermon, index) => (
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No sermons found matching your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="media">
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No media events found matching your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* <div className="text-center mt-8 md:hidden">
            <Button
              variant="link"
              className="text-indigo-600 flex items-center mx-auto"
              asChild
            >
              <Link href="/sermons">
                View All Sermons <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div> */}
        </div>

        {selectedMedia && (
          <CustomMediaPlayer
            trackList={trackList}
            currentTrackIndex={currentTrackIndex}
            onChangeTrackIndex={setCurrentTrackIndex}
            onClose={handleCloseMedia}
          />
        )}

        {selectedVideo && (
          <VideoModal
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Sermons;
