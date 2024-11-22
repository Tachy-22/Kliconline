"use client";

import React from "react";

const MissionAndVision: React.FC = () => {
  return (
    <section className="py-[6rem] max-w-7xl mx-auto">
      <div className=" mx-auto px-[4.5rem]">
        <div className="flex lg:flex-row flex-col gap-[3rem]">
          {/* Mission & Vision Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Our Mission & Vision
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Striving for a Better Tomorrow
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum.
            </p>
          </div>

          {/* What We Do Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              What We Do
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Bringing Peace and Joy to the World
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
