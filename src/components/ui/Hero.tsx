"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  // Use Framer Motion's scroll and transform hooks
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 600], [0, 300]); // Adjust range as needed

  return (
    <div className="relative w-full h-[45rem] overflow-hidden ">
      {/* Parallax Image */}
      <motion.div
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ y: translateY }}
      >
        <Image
          width={1500}
          height={663}
          alt="bg-image"
          src="/hero-img.svg"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-[80rem] mx-auto h-full flex flex-col justify-center gap-2 px-[4.5rem]">
        <span className="uppercase text-white/80 text-sm tracking-tight font-semibold">
          Welcome to our CHURCH
        </span>
        <h1 className="text-4xl py-[0.5rem] font-bold flex flex-col gap-3 text-white uppercase">
          <span>Become a part of</span>
          <span>our community</span>
        </h1>
        <div className="my-[1rem]">
          <Button className="px-4 py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase w-fit">
            Learn More
          </Button>
        </div>
        <span className="max-w-[80%] text-white/90 text-sm font-light pt-[1rem]">
          - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
        </span>
      </div>
    </div>
  );
};

export default Hero;
