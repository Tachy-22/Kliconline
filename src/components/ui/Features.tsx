"use client";
import React from "react";
import { PrayIcon } from "./icons";

const Features = () => {
  const features = [
    {
      title: "About Us",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: PrayIcon, // Replace with an appropriate icon
    },
    {
      title: "Get Involved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: PrayIcon, // Replace with an appropriate icon
    },
    {
      title: "Giving Back",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: PrayIcon, // Replace with an appropriate icon
    },
  ];

  return (
    <section className="py-12 md:max-w-[80rem] mx-auto  bg-white text-center">
      {/* Sub-headline */}
      <h2 className="text-lg uppercase text-gray-600">Sub-Headline</h2>
      <h1 className="text-3xl font-bold mt-2">A Church That&#39;s Relevant</h1>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-6 md:px-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#FFF5EB] pt-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col gap-3"
          >
            {/* Icon */}
            <div className="px-6">
              <div className="text-2xl w-[3rem] flex items-center justify-center h-[3rem] bg-[#ffd2a4]  rounded-full  ">
                {<feature.icon />}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold  text-start px-6">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-800 px-6 text-start">
              {feature.description}
            </p>

            {/* Bottom Accent */}
            <div className="mt-4 h-4 bg-[#ffd2a4] w-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
