"use client";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="py-12  text-center ">
      {/* Sub-Headline */}
      <h2 className="text-lg uppercase text-gray-500">Our Mission & Vision</h2>

      {/* Headline */}
      <h1 className="text-3xl font-bold mt-2">We are Here To Touch lives !</h1>

      {/* Description */}
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        At Kingdom Life International Church, our mission is to spread the
        gospel of Jesus Christ, making disciples of all nations.
      </p>

      {/* Read More Button */}
      <div className="mt-6 mx-auto w-fit">
        <Link
          href="/about-us"
          className="text-orange-500 font-semibold flex items-center gap-2 hover:underline"
        >
          Read More <span>→</span>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
