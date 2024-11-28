"use client";

import React from "react";
import Hero from "../ui/Hero";
import Features from "../ui/Features";
import Values from "../ui/Values";
import CTA from "../ui/CTA";
import WhyUs from "../ui/WhyUs";
//import LatestSermon from "../ui/LatestSermon";
import OurBlogs from "../ui/OurBlogs";
import OurBranches from "../ui/OurBranches";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <Hero />
      <div className="flex flex-col z-20 bg-white">
        <Features />
        <Values />
        <CTA />
        <WhyUs />
        {/* <LatestSermon sermon={sermon} /> */}
        <OurBranches />
        <OurBlogs />
      </div>
    </div>
  );
};

export default Home;
