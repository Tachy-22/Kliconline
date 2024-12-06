"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
//import { Button } from "./button";
import Link from "next/link";

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
    <div className="relative w-full h-[45rem]">
      {/* Fixed Background Image */}
      <div className="fixed top-0 left-0 w-full h-full bg-black">
        <Image
          width={1500}
          height={663}
          alt="bg-image"
          src="/hero-img.svg"
          className="w-full h-full object-cover opacity-90 transform-gpu"
          style={{ transform: `translate3d(0, ${scrollY * -0.1}px, 0)` }}
        />
      </div>

      {/* Content - will scroll over the fixed background */}
      <div className="relative z-10 max-w-[80rem] mx-auto h-full flex flex-col justify-center gap-2 lg:px-[4.5rem] px-[1rem]">
        <span className="uppercase text-white/80 text-sm tracking-tight font-semibold">
          Welcome to our CHURCH
        </span>
        <h1 className="text-4xl py-[0.5rem] font-bold flex flex-col gap-3 text-white uppercase">
          <span className="text-">
            Become a part of <span className="lg:hidden block">our</span>
          </span>
          <span>
            <span className="hidden lg:block">our</span> family
          </span>
        </h1>
        <div className="my-[1rem]">
          <Link
            href="/about-us"
            className="px-4 py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase w-fit"
          >
            Learn More
          </Link>
        </div>
        <span className="max-w-[80%] text-white/90 text-sm font-light pt-[1rem]">
          - Bringing you the light of God&apos;s word in simple and clear terms.
        </span>
      </div>
    </div>
  );
};

export default Hero;
