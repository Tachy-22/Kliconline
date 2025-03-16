"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Values = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const images = [
    "/value-img-1.jpg",
    "/drumming-img.jpg",
    "/worship-img-1.jpg",
  ];

  const onions = [
    "Global Missions & Evangelism",
    "Prayer",
    "Ministry of the Word",
    "Ministry of the Holy Spirit",
    "Worship",
    "Love-walk",
    "Excellence",
    "Mentoring and discipleship",
    "Influence and leadership",
    "Prosperity and Wealth Creation"
  ];

  return (
    <section className="py-8 lg:py-12 pb-16 bg-white text-center max-w-full w-full md:max-w-[80rem] mx-auto lg:px-[4.5rem] p-3 px-0 flex flex-col gap-2 overflow-hidden">
      {/* Sub-Headline */}
      <h1 className="text-3xl font-bold mt-2 uppercase text-start md:text-center px-2">
        OUR VISION
      </h1>

      {/* Description */}
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-start md:text-center px-2">
        We are commissioned and anointed of God to teach and preach the kingdom
        of God, in practical, simple and clear terms, by the instrumentality of
        the Word and the Spirit of God, so as to bring men into the maturity of
        Christ and to help them live as Kings and Priests on earth.
      </p>

      {/* Our Onions (Focus Areas) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl lg:mx-auto px-4">
        {onions.map((onion, index) => (
          <div key={index} className="flex lg:items-center gap-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <p className="text-gray-700">{onion}</p>
          </div>
        ))}
      </div>

      {/* Button - Only show on home page */}
      {isHomePage && (
        <div className="mt-6 w-full">
          <Link
            href="/about-us"
            className="px-4 py-2 bg-yellow-400 transition-all duration-500 drop-shadow-xl text-white rounded hover:bg-yellow-500/90 uppercase w-full md:w-fit"
          >
            READ MORE{" "}
          </Link>
        </div>
      )}

      {/* Image Grid */}
      <div className="">
        <div className="mt-10 h-full flex items-center md:items-start min-h-[30rem] overflow-x-auto md:max-w-full mx-auto lg:grid lg:grid-cols-3 lg:gap-6 bg-red-900/10 md:bg-gradient-to-b from-white to-gray-300 md:rounded-xl px-2 gap-2 shadow-2xl md:pt-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === 1 ? "lg:translate-y-[3rem]" : ""
              } rounded-2xl overflow-hidden shadow-lg h-[26rem] lg:min-w-full min-w-[80vw] md:w-full`}
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                className={`w-full h-full object-cover`}
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
