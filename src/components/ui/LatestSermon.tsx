"use client";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LatestSermon = () => {
  return (
    <section className="bg-gray-50 py-16 flex flex-col gap-[3rem] ">
      <div className="text-center flex flex-col gap-3">
        <p className="text-lg uppercase text-gray-600">LIVE EVENT</p>
        <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase max-w-[30rem] ">
          join us and become part of something great
        </h2>
      </div>
      <div className="max-w-7xl mx-auto w-full gap flex flex-col lg:flex-row items-center justify-between  lg:h-[30rem]">
        {/* Left: Event Details */}
        <div className="bg-[#FFF5EB]  rounded-lg p-6 px-[3rem] py-[2rem] w-full lg:w-1/3 flex flex-col justify-center  min-h-full h-full relative gap-6">
          <div className="text-sm text-orange-600 uppercase font-medium  ">
            SPONTANEOUS WORSHIP{" "}
          </div>
          <div className="flex items-center gap-2 -4 ">
            <div className=" flex flex-col justify-end items-end font-semibold text-lg rounded-lg px-4 py-2 uppercase absolute top-0 right-0 m-3">
              <span className=" FONT-BOLD">20</span> <span>July</span>
            </div>
            <div className="gap-2">
              <h3 className="text-xl font-bold text-gray-800">
                Watch and Listen to Our Sermons
              </h3>
              <p className="text-gray-600 -2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>
          {/* Time and Location */}
          <div className="flex  items-start gap-3 text-gray-600 ">
            <div className="">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m7-9a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="flex flex-col   items-start gap-2">
              <span>Friday 23:39 IST</span>
              <span>Saturday 11:20 ISD</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-gray-600 -6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m4-5a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
            <span>No 233 Main St. New York, United States</span>
          </div>
          {/* Register Button */}
          <Button className="bg-black p-6 text-[#FFD2A4] hover:bg-black/90 rounded">
            Listen
          </Button>
        </div>

        {/* Right: Image */}
        <div className="relative w-full lg:w-2/3 lg:min-h-full lg:h-full h-fit">
          <Image
            src="/sermon-img.svg" // Replace with your image path
            alt="Upcoming Sermons"
            width={800}
            height={450}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Bottom: Link */}
      <div className="text-right -8 max-w-7xl w-full mx-auto  p-4">
        <Link
          href="#"
          className=" text-black hover:text-orange-600 text-sm font-medium hover:underline flex items-center justify-end gap-1"
        >
          View all Sermons
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default LatestSermon;
