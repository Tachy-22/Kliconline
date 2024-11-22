"use client";

import React from "react";
import { Input } from "./input";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import SubmitButton from "./SubmitButton";

const ContactForm = () => {

  const handleSubmit = async (formData: FormData) => {
    const dataObj = Object.fromEntries(formData);
    console.log("formData : ", dataObj);
  };

  return (
    <section className="w-full py-12 bg-[#f9f4f0]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-5">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">CONTACT FORM:</h2>
          <form action={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-6 bg-white border-gray-300 rounded outline-none border-0 shadow-none  placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-6 bg-white border-gray-300 rounded outline-none border-0 shadow-none  placeholder:text-gray-400"
                required
              />
            </div>

            {/* Query Related */}
            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Query Related
              </label>
              <Input
                required
                id="query"
                name="query"
                type="text"
                placeholder="Specify your query"
                className="w-full p-6 bg-white border-gray-300 rounded outline-none border-0 shadow-none placeholder:text-gray-400"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                required
                id="message"
                name="message"
                placeholder="Write your message"
                className="w-full p-6 bg-white border-gray-300 rounded outline-none border-0 shadow-none"
                rows={5}
              ></textarea>
            </div>

            {/* Submit Button */}
            <SubmitButton
              loadingText="Sending..."
              className="w-full bg-orange-200 text-black py-6 rounded text-sm font-semibold hover:bg-orange-300 transition"
            >
              SEND MESSAGE
            </SubmitButton>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col space-y-6">
          {/* Address */}
          <div>
            <h3 className="text-lg font-bold">Address</h3>
            <p className="text-sm text-gray-700 leading-6">
              NH 234 PUBLIC SQUARE <br />
              SAN FRANCISCO 65368
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold">Contact Details</h3>
            <p className="text-sm text-gray-700 leading-6">
              (480) 555-0103 <br />
              FINSWEET@EXAMPLE.COM
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-bold">Find us here</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
