"use client";

import Image from "next/image";
import React from "react";

interface EventDetailsProps {
  event: EventT | null;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  if (!event) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-[20rem]">
        <Image
          src={event.images[0] || "/sermon-img.svg"}
          alt={event.title || "Upcoming Event"}
          width={2000}
          height={1000}
          className=" object-cover w-full h-full bg-gray-300 rounded"
        />
      </div>
      <h2 className="text-sm font-bold text-yellow-600 uppercase">
        {event.category || "Upcoming Event"}
      </h2>
      <h1 className="text-4xl font-extrabold text-gray-800">{event.title}</h1>
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
};

export default EventDetails;
