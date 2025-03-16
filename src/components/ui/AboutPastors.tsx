"use client";

import Image from "next/image";
import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export interface Pastors {
  name: string;
  role: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export const team: Pastors[] = [
  {
    name: "Pastor (Dr.) Sam ADEWUYI",
    role: "SETMAN",
    image: "hero-img.svg", // Replace with actual image path
    socialLinks: {
      facebook: "https://facebook.com/Sam Adewuyi",
      twitter: "https://twitter.com/Drsamadewuyi",
      instagram: "https://instagram.com/pstsamadewuyi",
    },
  },
  {
    name: "Pastor Olaide ADEWUYI",
    role: "SETMAN",
    image: "hero-img.svg", // Replace with actual image path
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },

];

const AboutPastors: React.FC = () => {
  return (
    <section className="py-[6rem] bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 md:px-6 lg:px-8 text-center">
        <h2 className="text-lg font-semibold text-gray-600 uppercase">
        Our Pastors
        </h2>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Meet Our Ministers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-2 md:p-6 text-center"
            >
              <Image
                width={2000}
                height={2000}
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <div className="flex justify-center space-x-4 mt-4">
                {member.socialLinks.facebook && (
                  <a
                    href={member.socialLinks.facebook}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {member.socialLinks.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPastors;
