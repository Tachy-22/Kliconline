"use client";
import SermonHero from "../../ui/SermonHero";
import LatestSermon from "../../ui/LatestSermon";
import SermonList from "../../ui/SermonList";

const Sermons = ({ sermons }: { sermons: SermonT[] }) => {
  return (
    <div className="flex flex-col">
      <SermonHero />
      <LatestSermon sermons={sermons} />
      <SermonList sermons={sermons} />
    </div>
  );
};

export default Sermons;
