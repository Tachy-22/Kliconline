"use client";
import Image from "next/image";
import React from "react";
//import { Button } from "./button";
import Link from "next/link";

const Values = () => {
  const images = [
    "/value-img-1.jpg",
    "/drumming-img.jpg",
    "/worship-img-1.jpg",
  ];

  return (
    <section className="py-8 lg:py-12 pb-16  bg-white text-center max-w-full w-full md:max-w-[80rem] mx-auto lg:px-[4.5rem] p-3 px-0 flex flex-col gap-2 overflow-hidden">
      {/* Sub-Headline */}
      <h2 className="text-lg uppercase text-gray-600  text-start md:text-center px-2">
        OUR CORE VALUES
      </h2>
      <h1 className="text-3xl font-bold mt-2 uppercase  text-start md:text-center px-2">
        Faith, Love, and Service
      </h1>

      {/* Description */}
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-start md:text-center px-2">
        At Kingdom Life International Church, we are built on the foundations of
        unwavering faith in God&apos;s Word, unconditional love for all people,
        and dedicated service to our community. We believe in creating an
        atmosphere where people can experience God&apos;s presence and discover
        their divine purpose through worship, fellowship, and ministry.
      </p>

      {/* Button */}
      <div className="mt-6 w-full">
        <Link
          href="/blogs/KSJZam6phQR2effxTDNo"
          className="px-4 py-2 bg-yellow-400  transition-all duration-500 drop-shadow-xl text-white rounded hover:bg-yellow-500/90 uppercase w-full md:w-fit"
        >
          READ MORE{" "}
        </Link>
      </div>

      {/* Image Grid */}
      <div className="   ">
        <div className="mt-10 h-full flex items-center md:items-start min-h-[30rem] overflow-x-auto  md:max-w-full mx-auto lg:grid  lg:grid-cols-3 lg:gap-6 bg-red-900/10 md:bg-gradient-to-b  from-white to-gray-300 md:rounded-xl  px-2  gap-2 shadow-2xl md:pt-2 ">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === 1 ? "lg:translate-y-[3rem]" : ""
              } rounded-2xl  overflow-hidden shadow-lg h-[26rem] lg:min-w-full min-w-[80vw] md:w-full`}
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                className={`w-full h-full object-cover `}
                width={6000}
                height={4000}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
