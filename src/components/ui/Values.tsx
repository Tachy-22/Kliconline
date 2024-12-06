"use client";
import Image from "next/image";
import React from "react";
//import { Button } from "./button";
import Link from "next/link";

const Values = () => {
  const images = ["/hero-img.svg", "/contacthero-img.svg", "/sermon-img.svg"];

  return (
    <section className="py-8 md:py-12 pb-16 md:pb-20 bg-white text-center max-w-full md:max-w-[80rem] mx-auto lg:px-[4.5rem] p-3 flex flex-col gap-2 overflow-hidden">
      {/* Sub-Headline */}
      <h2 className="text-lg uppercase text-gray-600  text-start lg:text-center">
        OUR CORE VALUES
      </h2>
      <h1 className="text-3xl font-bold mt-2 uppercase  text-start lg:text-center">
        Faith, Love, and Service
      </h1>

      {/* Description */}
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-start lg:text-center">
        At Kingdom Life International Church, we are built on the foundations of
        unwavering faith in God&apos;s Word, unconditional love for all people,
        and dedicated service to our community. We believe in creating an
        atmosphere where people can experience God&apos;s presence and discover
        their divine purpose through worship, fellowship, and ministry.
      </p>

      {/* Button */}
      <div className="mt-6">
        <Link
          href="/blogs/llD6PDyPRahtUgTS19sL"
          className="px-4 py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase w-fit"
        >
          READ MORE{" "}
        </Link>
      </div>

      {/* Image Grid */}
      <div className="   ">
        <div className="mt-10 h-full flex min-h-[30rem] overflow-x-auto max-w-[87vw] lg:max-w-full mx-auto lg:grid  lg:grid-cols-3 lg:gap-6  md:px-12 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === 1 ? "lg:translate-y-[3rem]" : ""
              } rounded-2xl  overflow-hidden shadow-lg h-[26rem] lg:min-w-full min-w-[80vw] lg:w-full`}
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
      </div>
    </section>
  );
};

export default Values;
