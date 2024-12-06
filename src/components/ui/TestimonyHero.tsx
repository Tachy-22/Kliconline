
"use client"
import React from 'react'

const TestimonyHero = () => {
  return (
    <section
      className="relative h-[26rem] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/abouthero-img.svg')" }}
    >
      <div className="relative z-10 flex flex-col items-start justify-center h-full mx-auto max-w-7xl lg:px-[4.5rem] px-[1rem] text-black">
        <h2 className="text-sm uppercase tracking-wide font-semibold">
          TESTIMONIES
        </h2>
        <h1 className="text-4xl font-bold mt-2 uppercase">
          What People Say About Our God
        </h1>
      </div>
    </section>
  );
}

export default TestimonyHero