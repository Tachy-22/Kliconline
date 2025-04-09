"use client";

import React from "react";
import Hero from "../../ui/Hero";
import Features from "../../ui/Features";
import Values from "../../ui/Values";
//mport CTA from "../ui/CTA";
import WhyUs from "../../ui/WhyUs";
//import LatestSermon from "../ui/LatestSermon";
import OurBlogs from "../../ui/OurBlogs";
import OurBranches from "../../ui/OurBranches";
import ViewSermons from "../../ui/ViewSermons";

const Home = ({ sermons, blogs }: { sermons: SermonT[]; blogs: BlogT[] }) => {
  return (
    <div className="flex flex-col ">
      <Hero />
      <div className="flex flex-col z-20 bg-white">
        <Features />
        <Values />
        {/* <CTA /> */}
        <WhyUs />
        <ViewSermons sermons={sermons} />
        <OurBranches />
        <OurBlogs blogs={blogs} />
      </div>
    </div>
  );
};

export default Home;
