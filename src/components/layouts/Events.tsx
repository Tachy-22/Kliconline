"use client";
import React from "react";
import EventDetails from "../ui/EventDetails";
import EventRegisterationForm from "../ui/EventRegisterationForm";
import EventsList from "../ui/EventsList";

const Events = () => {
  return (
    <div className="flex flex-col  py-[2rem] bg-[#F5F2F0]">
      <div className="h-full  px-6 md:px-20 max-w-7xl mx-auto flex flex-col gap-6">
        <h2 className="text-xl   text-gray-800/50 uppercase max-w-[30rem] ">
          Latest Event{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5rem]">
          <EventDetails />
          <EventRegisterationForm />
        </div>
      </div>
      <div className="py-[6rem] max-w-7xl mx-auto">
        <EventsList />
      </div>
    </div>
  );
};

export default Events;
