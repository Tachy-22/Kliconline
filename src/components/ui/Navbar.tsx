"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Sermons ", href: "/sermons" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="w-full bg-black sticky top-0 z-50">
      <div className="w-full  text-white  max-h-[5rem] flex items-center justify-between px-6 pr-[4.5rem] md:max-w-[80rem] mx-auto">
        {/* Logo Section */}
        <div className="text-xl py-3 font-bold border-r border-gray-400 px-[3rem]">
          <Link href="/"> Klic</Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-4 w-full py-3 uppercase px-[3rem] text-sm">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:underline text-white/75 hover:text-[#FFD2A4] font-extralight "
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Button Section */}
        <div className="py-3">
          <Button className="px-4 py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase">
            CONTACT US
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
