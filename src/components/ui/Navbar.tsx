"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Events", href: "/events" },
    { name: "Sermons", href: "/sermons" },
    { name: "Blogs", href: "/blogs" },
  ];

  const isActiveLink = (href: string) => pathname === href;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-black sticky left-0 top-0 z-50">
      <div className="w-full text-white max-h-[5rem] flex items-center justify-between px-6 md:max-w-[80rem] mx-auto">
        {/* Logo Section */}
        <div className="text-xl py-3 font-bold border-r lg:px-[3rem] pr-[2rem]">
          <Link href="/"> Klic</Link>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? <X /> : <Menu />}
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6 uppercase text-sm w-full px-[2rem]">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`hover:underline hover:text-[#FFD2A4] font-extralight ${
                isActiveLink(link.href) ? 'text-[#FFD2A4]' : 'text-white/75'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Button Section */}
        <div className="hidden md:block">
          <Button
            onClick={() => {
              router.push(`/contact`);
            }}
            className="px-4 py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase"
          >
            CONTACT US
          </Button>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-[80%] h-full bg-black/70 backdrop-blur text-white z-50 shadow-lg"
          >
            <div className="flex items-center justify-between p-6">
              <h1 className="text-xl font-bold">Klic</h1>
            
            </div>
            <nav className="flex flex-col gap-4 px-6 mt-4 uppercase text-sm">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`hover:underline hover:text-[#FFD2A4] font-extralight ${
                    isActiveLink(link.href) ? 'text-[#FFD2A4]' : 'text-white/75'
                  }`}
                  onClick={toggleSidebar} // Close sidebar when a link is clicked
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 px-6">
              <Button
                className="w-full py-2 bg-[#FFD2A4] text-black font-light rounded hover:bg-[#FFD2A4]/90 uppercase"
                onClick={toggleSidebar} // Optional: Close sidebar on button click
              >
                CONTACT US
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
