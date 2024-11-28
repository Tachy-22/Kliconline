"use client"
import React from "react";
import AboutHero from "../ui/AboutHero";
import Values from "../ui/Values";
import MissionAndVision from "../ui/MissionAndVision";
import Benefits from "../ui/Benefits";
import AboutPastors from "../ui/AboutPastors";

const About = () => {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <Values />
      <MissionAndVision />
      <Benefits />
      <AboutPastors />
    </div>
  );
};

export default About;
