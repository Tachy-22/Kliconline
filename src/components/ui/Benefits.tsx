"use client";

import Image from "next/image";
import React from "react";

type Benefit = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Spirit-Filled Worship",
    description:
      "Experience powerful worship through our Spontaneous Worship sessions (last Sunday of every other month) and Sunday services where God's presence transforms lives through anointed praise and teaching of God's Word.",
    image: "/benefit-img-1.jpg",
  },
  {
    id: 2,
    title: "Prayer & Discipleship",
    description:
      "Join our '6 Hours of Prayers' on the 3rd Saturday of each month and 'KLIC Prays - November to Remember' prayer program. Grow through our KLIC School of Ministry and In-Depth Bible Study (IDBS) sessions held weekly.",
    image: "/benefit-img-2.jpg",
  },
  {
    id: 3,
    title: "Global Community",
    description:
      "Be part of our international community with churches in the UK and Nigeria. Connect through our Hebrew Women Fellowship and experience the love and support of fellow believers across continents.",
    image: "/benefit-img-3.jpg",
  },
  {
    id: 4,
    title: "Digital Ministry",
    description:
      "Access our services from anywhere through our audio livestreaming on mixlr.com/kliconline and video livestreaming on YouTube (KLICECHURCH). Stay connected through our social media platforms for spiritual nourishment.",
    image: "/benefit-img-4.jpg",
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-sm md:text-lg text-gray-600 font-medium tracking-wider uppercase">
          OUR PROGRAMS
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-2xl mx-auto">
          How You Can Connect and Grow With Us
        </h2>
      </div>

      <div className="space-y-16 md:space-y-24">
        {benefits.map((benefit, id) => (
          <div
            key={benefit.id}
            className={`${
              id % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } flex flex-col lg:flex-row items-center gap-8 md:gap-12`}
          >
            <div className="w-full lg:w-1/2 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-700 leading-tight border-b-2 rounded-xl border-yellow-500 pb-2 px-2 ">
                {benefit.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-xl flex items-center justify-center border-4 border-red-950">
                <Image
                  width={2000}
                  height={1000}
                  src={benefit.image}
                  alt={benefit.title}
                  className="h-[500px] md:h-[400px] object-cover transition-all duration-300 object-top hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
