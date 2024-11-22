import React from "react";
import SermonHero from "../ui/SermonHero";
import LatestSermon from "../ui/LatestSermon";
import SermonList from "../ui/SermonList";

const Sermons = () => {
  return (
    <div className="flex flex-col">
      <SermonHero />
      <LatestSermon />
      <SermonList />
    </div>
  );
};

export default Sermons;
