"use client";

import React from "react";
import EventSummaryCard from "./EventSummaryCard";

// const events: Event[] = [
//   {
//     id: "1",
//     date: new Date(2024, 6, 20), // July 20, 2024
//     title: "100 RANDOM ACTS OF KINDNESS",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     time: "Friday 23:39 IST, Saturday 11:20 IST",
//     location: "No 233 Main St. New York, United States",
//     mediaUrl: "https://kliconline.mixlr.com/recordings/2488655",
//     images: [],
//     category: null,
//     status: "active",
//     isPublished: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "2",
//     date: new Date(2024, 6, 20), // July 20, 2024
//     title: "FAITH IS A PROCESS, NOT A DESTINATION",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     time: "Friday 23:39 IST, Saturday 11:20 IST",
//     location: "No 233 Main St. New York, United States",
//     mediaUrl: "https://www.youtube.com/embed/ppzf7BHEnlU",
//     images: [],
//     category: null,
//     status: "active",
//     isPublished: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "3",
//     date: new Date(2025, 6, 20), // July 20, 2024
//     title: "THERE IS NOTHING IMPOSSIBLE",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     time: "Friday 23:39 IST, Saturday 11:20 IST",
//     location: "No 233 Main St. New York, United States",
//     mediaUrl: null,
//     images: [],
//     category: null,
//     status: "active",
//     isPublished: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "4",
//     date: new Date(2025, 6, 20), // July 20, 2024
//     title: "CELEBRATING FREEDOM AND LIFE",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     time: "Friday 23:39 IST, Saturday 11:20 IST",
//     location: "No 233 Main St. New York, United States",
//     mediaUrl: null,
//     images: [],
//     category: null,
//     status: "active",
//     isPublished: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

interface EventsListProps {
  events: EventT[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const now = new Date();
  const pastEvents = events.filter(({ date }) => {
    const eventDate = new Date(date); // Convert Timestamp to Date
    const yes = eventDate < now;
    //console.log({ eventDate, yes, now });
    return eventDate < now;
  });
  const upcomingEvents = events.filter(({ date }) => {
    const eventDate = new Date(date); // Convert Timestamp to Date
    //console.log({ eventDate });
    return eventDate >= now;
  });

  return (
    <div className="flex flex-col gap-[5rem] px-3 lg:px-[4rem] ">
      <div className="flex w-full flex-col items-center gap-3 lg:gap-[2rem]">
        {" "}
        <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase max-w-[30rem]">
          PAST EVENTS
        </h2>
        {pastEvents && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full py-[1rem]">
            {pastEvents.map((event, index) => (
              <EventSummaryCard key={index} {...event} />
            ))}
          </div>
        )}
        {pastEvents.length === 0 && (
          <div className="text-center text-gray-500 text-2xl font-bold w-full bg-white/45 rounded border border-gray-300 h-[20rem] flex items-center justify-center ">
            No past events
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-3 lg:gap-[2rem]">
        <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase max-w-[30rem] ">
          UPCOMING EVENTS
        </h2>
        {upcomingEvents && (
          <div className="grid grid-cols-1 py-[1rem] md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventSummaryCard key={index} {...event} />
            ))}
          </div>
        )}
        {upcomingEvents.length === 0 && (
          <div className="text-center text-gray-500 text-2xl font-bold w-full bg-white/45 rounded border border-gray-300 h-[20rem] flex items-center justify-center">
            No upcoming events
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
