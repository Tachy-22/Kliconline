"use client";

import React, { useState } from "react";
import SermonCard from "./SermonCard";
import { Input } from "./input";
import { Search } from "lucide-react";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { DateRange } from "react-day-picker";

interface SermonListProps {
  sermons: SermonT[];
}

const SermonList: React.FC<SermonListProps> = ({ sermons: initialSermons }) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSermons, setFilteredSermons] = useState(initialSermons);

  //console.log({ initialSermons });

  const handleDateChange = (range: DateRange | undefined) => {
    if (range && range.from && range.to) {
      const filteredData = filterDataByDateRange(initialSermons, range);
      setFilteredSermons(filteredData);
    } else {
      setFilteredSermons(initialSermons);
    }
  };

  function filterDataByDateRange(data: SermonT[], range: DateRange) {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= (range.from as Date) && itemDate <= (range.to as Date);
    });
  }

  // Search sermons based on the title or description
  const searchedSermons = filteredSermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display the first 5 sermons unless "show all" is enabled
  const displayedSermons = showAll
    ? searchedSermons
    : searchedSermons.slice(0, 6);

  return (
    <section className="p-3 pb-[2rem] lg:py-[6rem] lg:px-[4.5rem] w-full max-w-7xl mx-auto flex flex-col gap-6 lg:gap-12">
      <h2 className="text-3xl font-bold mx-auto text-gray-800 uppercase max-w-[30rem] ">
        OUR SERMONS
      </h2>

      <div className="flex flex-col md:flex-row lg:items-center justify-between gap-4 mb-6 w-full ">
        {/* Search Input */}
        <div className="flex gap-3 items-center justify-between md:w-1/2 w-full border border-stone-800 hover:border-black p-2 rounded">
          <Search />

          <Input
            content="h"
            type="text"
            placeholder="Search sermons..."
            className="rounded-lg p-2 w-full border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter by Date Range */}
        <DatePickerWithRange onChange={handleDateChange} />
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {displayedSermons.map((sermon) => (
          <SermonCard key={sermon.id} {...sermon} />
        ))}
      </div>

      {/* "View More" Button */}
      {!showAll && searchedSermons.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            className="text-black py-2 px-4 rounded-lg hover:text-orange-500 transition-all duration-300"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default SermonList;
