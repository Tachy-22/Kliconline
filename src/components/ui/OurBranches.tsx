"use client";

import Image from "next/image";
import { Button } from "./button";

const OurBranches: React.FC = () => {
  return (
    <section
      className=" bg-cover flex items-center justify-center bg-center h-[46rem] "
      style={{
        backgroundImage: `url('/hero-img.svg')`,
      }}
    >
      <div className="bg-white relative flex flex-col gap-4 max-w-3xl mx-auto py-[3rem] px-[4em] rounded-md shadow-md">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <h2 className="text-3xl font-bold mb-4 flex flex-col gap-2">
              <span className="">WE ARE </span>
              <span className=""> LOCATED ALL</span>
              <span className="">OVER THE GLOBE</span>
            </h2>
            <p className="text-base text-gray-700 mb-6 max-w-[90&]">
              Our church has branches in over 50 countries worldwide. Find the
              nearest branch to connect with a community that feels like family.
            </p>
            <Button
              className="rounded bg-[#ffd2a4] hover:bg-[#ffd2a4]/90 w-fit p-6"
              onClick={() => alert("Navigate to the nearest branch finder!")}
            >
              Find a Branch Near You
            </Button>
          </div>
          <div className=" flex items-center">
            <Image width={1009} height={665} src="/world.svg" alt="map" />
          </div>
        </div>

        <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 left-0 transition-all duration-300"></div>
      </div>
    </section>
  );
};

export default OurBranches;
