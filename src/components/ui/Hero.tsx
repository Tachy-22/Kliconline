"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[30rem] md:h-[40rem]">
      {/* Fixed Background Image */}
      <div className="fixed top-0 left-0 w-full h-full bg-black">
        <Image
          width={6000}
          height={4000}
          alt="bg-image"
          src="/klic-home-2.jpg"
          className="w-full h-full object-cover opacity-90 transform-gpu transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        />
        {/* Yellowish-orangish overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div
          className="absolute inset-0 bg-yellow-950/90 mix-blend-overlay transform-gpu transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        />
      </div>

      {/* Content - will scroll over the fixed background */}
      <div className="relative z-10 max-w-[80rem] mx-auto h-full flex flex-col justify-center gap-3 lg:px-[4.5rem] px-[1rem] md:text-center md:items-center">
        <span className="uppercase text-white/80 text-sm tracking-tight font-semibold">
          Kingdom Life International Church
        </span>
        <h1 className="md:text-6xl text-3xl py-[0.5rem] font-extrabold flex flex-col gap-2 md:gap-4 text-white uppercase text-nowrap">
          <span className="">Living As Kings And</span>
          <span>
            <span className="font-['Great_Vibes'] text-yellow-200 italic">
              Priests On Earth
            </span>
          </span>
        </h1>
        <div className="my-[1rem]">
          <Link
            href="/about-us"
            className="px-4 py-2 bg-yellow-500 text-white/80 font-light rounded-[0.5rem] hover:bg-yellow-500/90 uppercase w-fit border-2 border-yellow-400 flex items-center gap-2 transition-all duration-500"
          >
            Discover More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
