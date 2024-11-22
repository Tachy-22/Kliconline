"use client";

import Image from "next/image";
import React from "react";

const EventDetails: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-[20rem]">
        <Image
          src="/sermon-img.svg" // Replace with your image path
          alt="Upcoming Sermons"
          width={800}
          height={450}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <h2 className="text-sm font-bold text-orange-600 uppercase">
        Upcoming Event
      </h2>
      <h1 className="text-4xl font-extrabold text-gray-800">
        KLC 2024: CHRIST OUR LIFE{" "}
      </h1>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in
        ornare quam viverra orci sagittis eu volutpat. Pharetra sit amet aliquam
        id diam maecenas ultricies.
      </p>
      <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in
        ornare quam viverra orci sagittis eu volutpat.
      </blockquote>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in
        ornare quam viverra orci sagittis eu volutpat. Pharetra sit amet aliquam
        id diam maecenas ultricies.
      </p>
    </div>
  );
};

export default EventDetails;
