"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { addDocument } from "@/actions/addDocument";
import { usePathname } from "next/navigation";
import SubmitButton from "./ui/SubmitButton";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

interface RegistrationData extends Record<string, unknown> {
  name: string;
  email: string;
  phone: string;
  eventId: string;
  registrationDate: string;
}

interface EventProps {
  event: EventT;
  onComplete?: () => void;
}

const EventRegisterationForm = ({ event, onComplete }: EventProps) => {
  const path = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const eventDate = event.date;
  const eventId = event.id;
  const formattedDate = formatToMonthDayYear(eventDate);

  // Add check for past event
  const isEventPassed = new Date(eventDate) < new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const registrationData: RegistrationData = {
      ...formData,
      eventId,
      registrationDate: new Date().toISOString(),
    };

    const result = await addDocument(
      "registered-participants",
      registrationData,
      path as string
    );
    if ("code" in result) {
      // Handle error
      console.error(result.message);
    } else {
      // Handle success
      //console.log("Registration successful");
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="bg-[#F7F8FA] shadow-md p-4 lg:p-10 rounded-md h-fit">
      <h3 className="text-2xl capitalize font-bold text-gray-800">
        {isEventPassed ? "Event Closed" : "Register Now"}
      </h3>
      <div className="mt-6 flex lg:flex-row flex-col text-gray-600 gap-5 justify-between">
        {/* <p className="flex items-center space-x-3">
          <MapPin size={18} />
          <span>No 233 Main St. New York, United States</span>
        </p> */}
        <p className="flex items-center space-x-3">
          <Clock size={18} />
          <span>{formattedDate}</span>
        </p>
      </div>
      {isEventPassed ? (
        <div className="mt-8 text-center text-gray-600">
          <p>This event has already taken place.</p>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Leonard John"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-2 px-0 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@abc.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full mt-2 px-0 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1234567890"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full mt-2 px-0 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
              required
            />
          </div>
          <SubmitButton
            loadingtext="Registering..."
            className="w-full py-3 mt-4 bg-yellow-300 text-black font-medium rounded hover:bg-yellow-400"
          >
            Register Now
          </SubmitButton>
        </form>
      )}
    </div>
  );
};

export default EventRegisterationForm;
