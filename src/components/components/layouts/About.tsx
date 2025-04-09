"use client";
import React from "react";
import AboutHero from "../../ui/AboutHero";
import Values from "../../ui/Values";
//import MissionAndVision from "../ui/MissionAndVision";
import Benefits from "../../ui/Benefits";
import AboutPastors from "../../ui/AboutPastors";

import { Gift, Heart, HandHeart, Copy } from "lucide-react";

const About = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text} to clipboard!`);
  };

  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutPastors />
      <Values />
      {/* <MissionAndVision /> */}
      <Benefits />
      {/* Giving Details Section */}
      <div className="max-w-6xl mx-auto p-3 md:px-6 lg:px-8 mt-12">
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-primary uppercase tracking-wide">
            Giving Details{" "}
          </h2>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
            Partner With Us
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Your generous giving helps us continue spreading the Gospel and
            making a positive impact in peoplel&squo;s lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Tithe Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">KLIC TITHE</h3>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Bank Name
                  </p>
                  <p className="text-gray-700 font-medium">
                    GUARANTY TRUST BANK
                  </p>
                </div>

                <div className="relative">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Account Number
                  </p>
                  <div className="flex items-center">
                    <p className="text-gray-700 font-medium">0702519692</p>
                    <button
                      onClick={() => copyToClipboard("0702519692")}
                      className="ml-2 p-1 hover:bg-gray-100 rounded-full"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-gray-400 hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>

              {/* <button className="mt-6 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Copy Account Details
                </button> */}
            </div>
          </div>

          {/* Offerings Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  KLIC OFFERINGS
                </h3>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Bank Name
                  </p>
                  <p className="text-gray-700 font-medium">
                    GUARANTY TRUST BANK
                  </p>
                </div>

                <div className="relative">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Account Number
                  </p>
                  <div className="flex items-center">
                    <p className="text-gray-700 font-medium">0702519104</p>
                    <button
                      onClick={() => copyToClipboard("0702519104")}
                      className="ml-2 p-1 hover:bg-gray-100 rounded-full"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-gray-400 hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>

              {/* <button className="mt-6 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Copy Account Details
                </button> */}
            </div>
          </div>

          {/* Partnership Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <HandHeart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Sam Excelson Ministry
                </h3>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Bank Name
                  </p>
                  <p className="text-gray-700 font-medium">
                    GUARANTY TRUST BANK
                  </p>
                </div>

                <div className="relative">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Account Number
                  </p>
                  <div className="flex items-center">
                    <p className="text-gray-700 font-medium">0678416263</p>
                    <button
                      onClick={() => copyToClipboard("0678416263")}
                      className="ml-2 p-1 hover:bg-gray-100 rounded-full"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-gray-400 hover:text-primary" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">(Partnership)</p>
              </div>

              {/* <button className="mt-6 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Copy Account Details
                </button> */}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600">
            Thank you for your generous support of our ministry work.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Malachi 3:10 - &ldquo;Bring the whole tithe into the storehouse,
            that there may be food in my house.&ldquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
