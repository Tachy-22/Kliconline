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
    image: "/setman.png", // Replace with actual image path
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
  // Use the first pastor as the main pastor
  const mainPastor = team[0];

  return (
    <section className="py-[6rem] bg-gray-50">
      <div className="max-w-6xl mx-auto p-3 md:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-lg font-semibold text-gray-600 uppercase">
            Our Pastors
          </h2>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Meet Our Leadership
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
          {/* Full-width Pastor's Image Section */}
          <div className="w-full flex justify-center items-center py-8 px-4">
            <Image
              width={800}
              height={600}
              src={mainPastor.image}
              alt={mainPastor.name}
              className="max-w-full h-auto object-contain"
              style={{ maxHeight: '500px' }}
              priority
            />
          </div>

          {/* Pastor's Information Section */}
          <div className="p-6 md:p-8 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">Pastor (Dr.) Sam & Olaide ADEWUYI</h3>
                <p className="text-lg text-primary font-semibold">SETMAN</p>
              </div>
              
              <div className="flex space-x-4 mt-4 md:mt-0">
                {Object.entries(mainPastor.socialLinks).map(([platform, link]) => {
                  if (!link) return null;
                  
                  const Icon = platform === 'facebook' ? Facebook :
                               platform === 'twitter' ? Twitter :
                               platform === 'instagram' ? Instagram : Linkedin;
                  
                  return (
                    <a
                      key={platform}
                      href={link}
                      className="text-gray-600 hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Pastor (Dr.) Sam & Olaide ADEWUYI are the SETMAN of Kingdom Life International Church, a rapidly growing 
                movement, headquartered in Akure, Nigeria, with an extension in the city of York, United Kingdom.
              </p>
              <p className="text-gray-700 mb-4">
                They teach the message of Christ Jesus with clarity and simplicity by the inspiration of the Holy Spirit, 
                shedding light on how believers can engage the works of faith to produce results in the secular space, 
                ultimately making them a relevant and positive force, as well as a blessing on the earth.
              </p>
              <p className="text-gray-700">
                They are resident in the United Kingdom and their beautiful union is blessed with amazing children.
              </p>
            </div>
          </div>
        </div>

        {/* Giving Details Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 bg-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Support Our Ministry</h2>
              <p className="text-gray-600 mt-1">Your giving helps us reach more people with the Gospel</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tithe Section */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">KLIC TITHE</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Bank Name:</span> GUARANTY TRUST BANK
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Account Number:</span> 0702519692
                  </p>
                </div>
              </div>
              
              {/* Offerings Section */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">KLIC OFFERINGS</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Bank Name:</span> GUARANTY TRUST BANK
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Account Number:</span> 0702519104
                  </p>
                </div>
              </div>
              
              {/* Partnership Section */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-3">Sam Excelson Teaching Ministry</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Bank Name:</span> GUARANTY TRUST BANK
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Account Number:</span> 0678416263
                  </p>
                  <p className="text-gray-700 text-sm italic mt-1">(Partnership)</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 text-gray-600">
              <p>Thank you for your generous support of our ministry work.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPastors;
