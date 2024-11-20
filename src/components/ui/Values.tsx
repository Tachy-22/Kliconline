"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./button";

const Values = () => {
  const images = [
    "hero-img.svg", // Replace with actual image paths
    "hero-img.svg",
    "hero-img.svg",
  ];

  return (
    <section className="py-12 pb-20 bg-white text-center md:max-w-[80rem] mx-auto ">
      {/* Sub-Headline */}
      <h2 className="text-lg uppercase text-gray-600">WHAT ARE WE ABOUT?</h2>
      <h1 className="text-3xl font-bold mt-2">Love and Compassion</h1>

      {/* Description */}
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Quis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      {/* Button */}
      <div className="mt-6">
        <Button className="px-4 py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase w-fit">
          READ MORE{" "}
        </Button>
      </div>

      {/* Image Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === 1 ? "translate-y-[3rem]" : ""
            } rounded-2xl  overflow-hidden shadow-lg h-[26rem]`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className={`w-full h-full object-cover `}
              width={2000}
              height={2000}
            />
          </div>
        ))}
      </div>
 
    </section>
  );
};

export default Values;
