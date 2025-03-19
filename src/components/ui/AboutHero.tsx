"use client"
import React from 'react'

const AboutHero = () => {
  return (
    <section
      className="relative h-[26rem] bg-cover bg-top text-white"
      style={{ backgroundImage: "url('/about-hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full mx-auto max-w-7xl lg:px-[4.5rem] px-[1rem] text-white">
        <h2 className="text-sm uppercase tracking-wide font-semibold">
          ABOUT US{" "}
        </h2>
        <h1 className="text-4xl font-bold mt-2  uppercase">
          Serving the world around us{" "}
        </h1>
      </div>
    </section>
  );
}

export default AboutHero