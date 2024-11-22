"use client";

import React from "react";
import EventSummaryCard from "./EventSummaryCard";

interface Event {
  date: Date;
  title: string;
  description: string;
  time: string;
  location: string;
}

const events: Event[] = [
  {
    date: new Date(2024, 6, 20), // July 20, 2024
    title: "100 RANDOM ACTS OF KINDNESS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "Friday 23:39 IST, Saturday 11:20 IST",
    location: "No 233 Main St. New York, United States",
  },
  {
    date: new Date(2024, 6, 20), // July 20, 2024
    title: "FAITH IS A PROCESS, NOT A DESTINATION",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "Friday 23:39 IST, Saturday 11:20 IST",
    location: "No 233 Main St. New York, United States",
  },
  {
    date: new Date(2024, 6, 20), // July 20, 2024
    title: "THERE IS NOTHING IMPOSSIBLE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "Friday 23:39 IST, Saturday 11:20 IST",
    location: "No 233 Main St. New York, United States",
  },
  {
    date: new Date(2024, 6, 20), // July 20, 2024
    title: "CELEBRATING FREEDOM AND LIFE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "Friday 23:39 IST, Saturday 11:20 IST",
    location: "No 233 Main St. New York, United States",
  },
];

const EventsList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-[4.5rem] ">
      <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase max-w-[30rem]">
        UPCOMING EVENTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventSummaryCard
            key={index}
            date={event.date}
            title={event.title}
            description={event.description}
            time={event.time}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
