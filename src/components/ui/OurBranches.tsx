"use client";

import Image from "next/image";
import Link from "next/link";

const OurBranches: React.FC = () => {
  return (
    <section
      className=" bg-cover   flex items-center justify-center bg-center max-w-full lg:h-[46rem]  "
      style={{
        backgroundImage: `url('/hero-img.svg')`,
      }}
    >
      <div className="bg-white relative flex flex-col gap-4 lg:max-w-3xl max-w-full mx-auto p-3 py-6 lg:py-[3rem] lg:px-[4em] rounded-md shadow-md ">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <h2 className="text-3xl font-bold mb-4 flex flex-col gap-2">
              <span className="">WE ARE </span>
              <span className=""> LOCATED ALL</span>
              <span className="">OVER THE GLOBE</span>
            </h2>
            <p className="text-base text-gray-700 mb-6 max-w-[90&]">
              Our church has extensions in countries worldwide. Find the
              nearest branch to connect with a community that feels like family.
            </p>
            <Link
              href="/branches"
              className="inline-block px-8 py-4 text-black font-medium rounded-lg bg-[#ffd2a4] hover:bg-[#ffc988] transition-colors duration-300"
            >
              Find an Extension Near You
            </Link>
          </div>
          <div className=" flex items-center lg:pt-0 pt-4">
            <Image width={1009} height={665} src="/world.svg" alt="map" />
          </div>
        </div>

        <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 left-0 transition-all duration-300"></div>
      </div>
    </section>
  );
};

export default OurBranches;
