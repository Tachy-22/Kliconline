"use client";
import React from "react";
import { PrayIcon } from "./icons";

const Features = () => {
  const features = [
    {
      title: "Our Community",
      description:
        "Join our welcoming family of believers where everyone belongs. We create a space for authentic relationships, spiritual growth, and support through life's journey.",
      icon: PrayIcon,
    },
    {
      title: "Ministry & Service",
      description:
        "Discover your purpose through our various ministries. From youth programs to community outreach, there are countless ways to serve God and others.",
      icon: PrayIcon,
    },
    {
      title: "Worship & Prayer",
      description:
        "Experience powerful worship and prayer that connects hearts to God. Our services combine contemporary and traditional elements to create meaningful spiritual encounters.",
      icon: PrayIcon,
    },
  ];

  return (
    <section className="py-12 md:max-w-[80rem] mx-auto bg-white text-center">
      {/* Sub-headline */}
      <h2 className="text-lg uppercase text-gray-600">Our Mission</h2>
      <h1 className="text-3xl font-bold mt-2 mx-auto uppercase max-w-[80%] w-full" >A Church That&#39;s Relevant</h1>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-3 md:px-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-yellow-100/50 pt-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col gap-3 justify-between"
          >
            {/* Icon */}
            <div className="px-6">
              <div className="text-2xl w-[3rem] flex items-center justify-center h-[3rem] bg-yellow-300  rounded-full  ">
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
            <div className="mt-4 h-4 bg-yellow-300 w-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
