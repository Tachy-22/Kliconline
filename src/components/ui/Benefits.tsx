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
      "Experience powerful, life-transforming worship services where God's presence is manifested through anointed praise, worship, and the teaching of God's Word.",
    image: "/img1.jpg",
  },
  {
    id: 2,
    title: "Strong Fellowship",
    description:
      "Be part of a loving community of believers who support, encourage, and pray for one another. Our small groups and fellowship programs help build lasting spiritual relationships.",
    image: "/hero-img.svg",
  },
  {
    id: 3,
    title: "Kingdom Programs",
    description:
      "Participate in our various spiritual development programs, including Bible study, leadership training, youth ministry, and special events designed to strengthen your faith.",
    image: "/hero-img.svg",
  },
  {
    id: 4,
    title: "Community Impact",
    description:
      "Join our outreach initiatives that touch lives through humanitarian services, educational support, and community development projects, demonstrating Christ's love in practical ways.",
    image: "/hero-img.svg",
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-sm md:text-lg  text-gray-600 font-medium tracking-wider uppercase">
          WHAT ARE WE ABOUT?
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-2xl mx-auto">
          The Benefits of Joining Our Church
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
              <h3 className="text-2xl md:text-3xl font-bold text-gray-700 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  width={2000}
                  height={1000}
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-[300px] md:h-[400px] object-cover transform  transition-transform duration-300"
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
