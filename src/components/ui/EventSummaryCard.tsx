"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, MapPin, Maximize2, Minimize2, X } from "lucide-react";
import FocusTrap from "focus-trap-react";
import { Button } from "./button";



const EventSummaryCard: React.FC<EventT> = ({
  date,
  title,
  description,
  time,
  location,
  mediaUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const eventDate = new Date(date); // Convert Timestamp to Date
  const isPastEvent = eventDate < new Date();

  const dayFormatter = new Intl.DateTimeFormat('en', { day: 'numeric' });
  const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });

  const formattedDay = dayFormatter.format(eventDate);
  const formattedMonth = monthFormatter.format(eventDate);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <article className="bg-[#ffff] py-8 relative p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <span className="text-yellow-600 text-sm font-bold uppercase">
            {isPastEvent ? "Past Event" : "Upcoming Event"}
          </span>
          <div className="text-right">
            <p className="text-xl font-semibold text-gray-800">
              {formattedDay}
            </p>
            <p className="text-sm text-gray-500">{formattedMonth}</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="mt-4 font-semibold">
          <div className="flex items-start gap-2 text-gray-600 text-sm">
            <Clock className="w-6 h-6" />
            <p>{time}</p>
          </div>
          <div className="flex items-start gap-2 text-gray-600 text-sm mt-2">
            <MapPin className="w-7 h-7" />
            <p>{location}</p>
          </div>
        </div>
        {isPastEvent && mediaUrl && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className=" bg-yellow-300 text-black   hover:bg-yellow-400 transition-colors duration-300 focus:ring-2 focus:ring-yellow-300  focus:ring-offset-2 rounded"
            aria-label={`Watch recording of ${title}`}
          >
            Watch Recording
          </Button>
        )}
        <div className="w-full h-3 bg-yellow-200 absolute bottom-0 left-0 transition-all duration-300"></div>
      </article>

      {isModalOpen && (
        <FocusTrap>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm  "
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div
              ref={modalRef}
              className={`bg-white !rounded-lg  shadow-2xl ${
                isFullscreen ? "fixed inset-0" : "w-[80vw] h-[80vh] max-w-6xl"
              } focus:outline-none transition-all duration-300`}
            >
              <header className="p-4 flex justify-between items-center border-b rounded-t-2xl bg-gray-50">
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  {title}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:ring-2 focus:ring-yellow-300 text-black"
                    aria-label={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                  >
                    {isFullscreen ? (
                      <Minimize2 aria-hidden="true" />
                    ) : (
                      <Maximize2 aria-hidden="true" />
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:ring-2 focus:ring-yellow-300 text-black"
                    aria-label="Close modal"
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
              </header>
              <div className="h-[calc(100%-4rem)] w-full bg-black">
                {mediaUrl && (
                  <iframe
                    src={mediaUrl}
                    className="w-full h-full"
                    title={`${title} - Video Recording`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
};

export default EventSummaryCard;
