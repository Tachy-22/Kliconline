"use client";

import React, { useState } from "react";
import SermonCard from "./SermonCard";
import { Input } from "./input";
import { Search } from "lucide-react";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { DateRange } from "react-day-picker";

interface Sermon {
  title: string;
  description: string;
  date: Date; // Format: "20 July"
  times: string[];
  location: string;
  type: string;
}

const sermons: Sermon[] = [
  {
    title: "Watch and Listen to Our Sermons",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: new Date(2022, 6, 20), // 20 July
    times: ["Friday 23:39 IST", "Saturday 11:20 ISD"],
    location: "No 233 Main St. New York, United States",
    type: "IDBS",
  },
  {
    title: "Join Our Evening Service",
    description: "A wonderful evening session to connect and worship.",
    date: new Date(2022, 6, 15), // 15 July
    times: ["Sunday 18:00 IST"],
    location: "25th Street, LA, California",
    type: "SUNDAY",
  },
  {
    title: "Morning Worship Session",
    description: "Experience the morning glory with prayers and hymns.",
    date: new Date(2022, 7, 25), // 25 Aug
    times: ["Saturday 09:00 IST", "Sunday 10:30 IST"],
    location: "12th Ave, Seattle, Washington",
    type: "IDBS",
  },
  {
    title: "Community Prayer Night",
    description: "Gather with our community for an evening of prayer.",
    date: new Date(2022, 8, 5), // 5 Sept
    times: ["Monday 19:00 IST"],
    location: "14B Park St, Boston, Massachusetts",
    type: "IDBS",
  },
  {
    title: "Sunday Bible Study",
    description: "Deepen your faith with our interactive Bible study.",
    date: new Date(2022, 7, 30), // 30 Aug
    times: ["Sunday 17:00 IST"],
    location: "3rd Floor, Church Hall, Denver, Colorado",
    type: "SUNDAY",
  },
  {
    title: "Special Youth Session",
    description: "Empowering the youth with faith and fellowship.",
    date: new Date(2022, 8, 10), // 10 Sept
    times: ["Saturday 16:00 IST"],
    location: "35 West Ave, Chicago, Illinois",
    type: "IDBS",
  },
  {
    title: "Family Worship Event",
    description: "A special session designed for families to connect.",
    date: new Date(2022, 6, 28), // 28 July
    times: ["Saturday 15:00 IST", "Sunday 18:00 IST"],
    location: "Main Auditorium, San Francisco, California",
    type: "SUNDAY",
  },
  {
    title: "Thanksgiving Service",
    description: "Celebrate gratitude and faith with our congregation.",
    date: new Date(2022, 10, 22), // 22 Nov
    times: ["Thursday 11:00 IST"],
    location: "Central Church, Houston, Texas",
    type: "IDBS",
  },
  {
    title: "Marriage Seminar and Worship",
    description: "Strengthen your marriage through faith and worship.",
    date: new Date(2022, 7, 5), // 5 Aug
    times: ["Sunday 14:00 IST"],
    location: "Community Center, Orlando, Florida",
    type: "SUNDAY",
  },
  {
    title: "Praise and Worship Night",
    description: "An evening of heartfelt praise and joyful worship.",
    date: new Date(2022, 11, 12), // 12 Dec
    times: ["Friday 20:00 IST"],
    location: "Hall B, Brooklyn, New York",
    type: "IDBS",
  },
  {
    title: "Healing and Restoration Service",
    description: "Join us for a special service of healing and hope.",
    date: new Date(2022, 8, 18), // 18 Sept
    times: ["Tuesday 19:30 IST"],
    location: "East Wing, Los Angeles, California",
    type: "IDBS",
  },
  {
    title: "Outdoor Sunday Service",
    description: "Worship in the beauty of God’s creation outdoors.",
    date: new Date(2022, 6, 25), // 25 July
    times: ["Sunday 08:00 IST"],
    location: "Central Park, New York City",
    type: "SUNDAY",
  },
  {
    title: "Advent Worship Gathering",
    description: "Prepare your heart for the season of Advent.",
    date: new Date(2022, 11, 1), // 1 Dec
    times: ["Friday 17:30 IST"],
    location: "North Campus, Dallas, Texas",
    type: "IDBS",
  },
  {
    title: "Easter Morning Service",
    description: "Celebrate the resurrection with our Easter service.",
    date: new Date(2022, 2, 31), // 31 March
    times: ["Sunday 06:00 IST"],
    location: "Church Grounds, Miami, Florida",
    type: "SUNDAY",
  },
  {
    title: "Children's Worship Session",
    description: "A special session designed for kids to worship.",
    date: new Date(2022, 7, 14), // 14 Aug
    times: ["Monday 10:00 IST"],
    location: "Kids' Hall, Atlanta, Georgia",
    type: "IDBS",
  },
  {
    title: "Christmas Celebration Service",
    description: "Celebrate the joy of Christmas with carols and prayers.",
    date: new Date(2022, 11, 25), // 25 Dec
    times: ["Monday 19:00 IST"],
    location: "Main Cathedral, Portland, Oregon",
    type: "IDBS",
  },
  {
    title: "Evening Devotion and Reflection",
    description: "An intimate time of devotion and reflection.",
    date: new Date(2022, 9, 10), // 10 October
    times: ["Tuesday 18:00 IST"],
    location: "Chapel Hall, Phoenix, Arizona",
    type: "IDBS",
  },
  {
    title: "Mission Sunday Service",
    description: "Learn about our mission and support the cause.",
    date: new Date(2022, 9, 8), // 8 October
    times: ["Sunday 09:00 IST"],
    location: "Mission Hall, Detroit, Michigan",
    type: "SUNDAY",
  },
  {
    title: "Women’s Empowerment Service",
    description: "Empowering women through faith and prayer.",
    date: new Date(2022, 10, 20), // 20 Nov
    times: ["Wednesday 11:30 IST"],
    location: "Conference Room, Las Vegas, Nevada",
    type: "IDBS",
  },
  {
    title: "Holy Communion Service",
    description: "Partake in the holy communion with our congregation.",
    date: new Date(2022, 10, 30), // 30 Nov
    times: ["Saturday 10:00 IST"],
    location: "St. Peter's Church, San Diego, California",
    type: "IDBS",
  },
];

const SermonList: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSermons, setFilteredSermons] = useState(sermons);

  const handleDateChange = (range: DateRange | undefined) => {
    if (range && range.from && range.to) {
      const filteredData = filterDataByDateRange(sermons, range);
      setFilteredSermons(filteredData);
    } else {
      setFilteredSermons(sermons);
    }
  };

  function filterDataByDateRange(data: Sermon[], range: DateRange) {
    return data.filter(
      (item) =>
        item.date >= (range.from as Date) && item.date <= (range.to as Date)
    );
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
    <section className="py-[6rem] px-[4.5rem] w-full max-w-7xl mx-auto flex flex-col gap-12">
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
        {displayedSermons.map((sermon, index) => (
          <SermonCard key={index} {...sermon} />
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
