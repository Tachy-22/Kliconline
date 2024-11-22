"use client"

import React from 'react'
import { MapPin, Clock } from 'lucide-react'

const EventRegisterationForm = () => {
  const eventDate = new Date(2022, 7, 25)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="bg-[#F7F8FA] shadow-md p-10 rounded-md h-fit">
      <h3 className="text-2xl capitalize font-bold text-gray-800">Register Now</h3>
      <div className="mt-6 flex text-gray-600 gap-5 justify-between">
        <p className="flex items-center space-x-3">
          <MapPin size={18} />
          <span>No 233 Main St. New York, United States</span>
        </p>
        <p className="flex items-center space-x-3">
          <Clock size={18} />
          <span>{formattedDate}</span>
        </p>
      </div>
      <form className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Leonard John"
            className="w-full mt-2 px-0 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="admin@abc.com"
            className="w-full mt-2 px-0 py-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-orange-500 text-white font-medium rounded hover:bg-orange-600"
        >
          Register Now
        </button>
      </form>
    </div>
  );
}

export default EventRegisterationForm