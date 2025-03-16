"use client";

import React from "react";

const MissionAndVision: React.FC = () => {
  return (
    <section className="py-[2rem] md:py-[4rem] max-w-7xl mx-auto">
      <div className="mx-auto p-3 md:px-[4.5rem]">
        <div className="flex lg:flex-row flex-col gap-[3rem]">
          {/* Mission & Vision Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Our Vision
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Our Divine Commission
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We are commissioned and anointed of God to teach and preach the
              kingdom of God, in practical, simple and clear terms, by the
              instrumentality of the Word and the Spirit of God, so as to bring
              men into the maturity of Christ and to help them live as Kings and
              Priests on earth. The mandate of KLIC spans across 10 major areas
              of focus for the development of the Total Man.
            </p>
          </div>

          {/* Who We Are Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Who We Are
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Kingdom Life International Church
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We are a movement committed to the development of the Total Man
              through ten focus areas: Intense prayer, Evangelism and global
              mission, The word, Worship, The ministry of the Holy Spirit,
              Prosperity and wealth, Influence and leadership, Love work,
              Excellence, and Mentoring and discipleship. Through these pillars,
              we&apos;re helping people discover their purpose in Christ and
              live as Kings and Priests on earth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
