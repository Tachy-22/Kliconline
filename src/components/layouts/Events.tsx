"use client";
import React from "react";
import EventDetails from "../ui/EventDetails";
import EventRegisterationForm from "../forms/EventRegisterationForm";
import EventsList from "../ui/EventsList";

interface EventsProps {
  events: EventT[];
}

const Events = ({ events }: EventsProps) => {
  const success = Array.isArray(events) || "items" in events;
  const error = !success ? "Failed to load events" : null;

  // Get the most recent event by date
  const mostRecentEvent =
    success && events.length > 0
      ? events.reduce((latest, current) => {
          const latestDate = new Date(latest.date);
          const currentDate = new Date(current.date);
          return currentDate > latestDate ? current : latest;
        }, events[0])
      : null;

  console.log({ events });
  return (
    <div className="flex flex-col py-[2rem] w-full bg-[#F5F2F0]">
      <div className="h-full px-6 lg::px-20 max-w-7xl w-full mx-auto flex flex-col gap-6">
        <h2 className="text-xl text-gray-800/50 uppercase max-w-[30rem] ">
          Latest Event{" "}
        </h2>
        <div className="grid grid-cols-1 lg::grid-cols-2 gap-[5rem]">
          <EventDetails event={mostRecentEvent} />
          <EventRegisterationForm event={mostRecentEvent as EventT} />
        </div>
      </div>
      <div className="py-[6rem] max-w-7xl mx-auto">
        {success && <EventsList events={events} />}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-7xl mx-auto mb-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
