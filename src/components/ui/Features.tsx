"use client";
import React from "react";
import { PrayIcon } from "./icons";

const Features = () => {
  const features = [
    {
      title: "The Word & Holy Spirit",
      description:
        "Experience practical and clear teaching of God's Word through the power of the Holy Spirit, bringing maturity and revelation knowledge.",
      icon: PrayIcon,
    },
    {
      title: "Prayer & Worship",
      description:
        "Engage in intense prayer and vibrant worship as we pursue God's presence and power for transformation in our lives and communities.",
      icon: PrayIcon,
    },
    {
      title: "Global Missions & Discipleship",
      description:
        "Join our commitment to evangelism, mentoring, and global missions as we fulfill the Great Commission with excellence and love.",
      icon: PrayIcon,
    },
  ];

  return (
    <section className="py-12 md:max-w-[80rem] mx-auto bg-white text-center">
      {/* Sub-headline */}

      <h1 className="text-3xl font-bold  mx-auto uppercase max-w-[80%] w-full">
        Our Mission
      </h1>
      <h2 className="text-lg uppercase mt-2 text-gray-600">
        {" "}
        Raising Kings and Priests
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-3 md:px-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-yellow-100/50 pt-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col gap-3 justify-between"
          >
            {/* Icon */}
            <div className="px-6">
              <div className="text-2xl w-[3rem] flex items-center justify-center h-[3rem] bg-yellow-300 rounded-full">
                {<feature.icon />}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-start px-6">
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
