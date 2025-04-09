"use client";
import { useState } from "react";
import { Card } from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventRegistrationModal } from "./EventRegistrationModal";

interface LatestEventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  id?: string;
}

export function LatestEventCard({
  title,
  description,
  date,
  time,
  location,
  image,
  id = "latest-event",
}: LatestEventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert date to day, month, year
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Create an event object to pass to the registration form
  const eventObject: EventT = {
    id,
    title,
    description,
    date,
    time,
    location,
    images: image ? [image] : [],
    status: "upcoming", // Default status
    isPublished: true, // Default published state
    createdAt: new Date(), // Default creation date
    updatedAt: new Date(), // Default update date
  };

  // Check if event is in the past
  const isEventPassed = new Date(date) < new Date();

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="col-span-1">
            <div className="h-full">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="col-span-2 p-6">
            <div className="mb-2 inline-flex items-center px-3 py-1 font-medium text-xs rounded bg-church-yellow text-gray-900">
              LATEST EVENT
            </div>
            <h3 className="font-serif text-2xl font-bold mt-2 mb-3">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>

            <div className="space-y-2 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-church-purple" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-church-purple" />
                <span>{time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-church-purple" />
                <span>{location}</span>
              </div>
            </div>

            <Button
              className="bg-church-purple hover:bg-church-purple-dark text-white"
              onClick={() => setIsModalOpen(true)}
            disabled={isEventPassed}
            >
              {isEventPassed ? "Event Passed" : "Register Now"}
            </Button>
          </div>
        </div>
      </Card>
      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={eventObject}
      />
    </>
  );
}
