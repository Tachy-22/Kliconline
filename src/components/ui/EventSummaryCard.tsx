"use client";

import React from "react";
import { Clock, MapPin } from "lucide-react";

interface EventSummaryProps {
  date: Date;  // Changed from string to Date
  title: string;
  description: string;
  time: string;
  location: string;
}

const EventSummaryCard: React.FC<EventSummaryProps> = ({
  date,
  title,
  description,
  time,
  location,
}) => {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return (
    <div className=" bg-[#ffff] py-8 relative p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <span className="text-orange-500 text-sm font-bold uppercase">
          Upcoming Event
        </span>
        <div className="text-right">
          <p className="text-xl font-semibold text-gray-800">{day}</p>
          <p className="text-sm text-gray-500">{month}</p>
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
      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0  left-0 transition-all duration-300"></div>
    </div>
  );
};

export default EventSummaryCard;
