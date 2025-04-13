"use client";
import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleNavigation = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    closeMobileMenu();
    router.push(path);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Testimonies", path: "/testimonies" },
    { name: "Sermons", path: "/sermons" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Extensions", path: "/branches" },
  ];
  //donate
  return (
    <motion.nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className={cn(
                "text-2xl font-bold font-serif transition-colors duration-300",
                "text-church-purple"
              )}
            >
              KLIC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavigation(link.path, e)}
                className={cn(
                  "nav-link text-sm font-medium",
                  isActive(link.path) && !isScrolled
                    ? "text-church-yellow active"
                    : isActive(link.path) && isScrolled
                    ? "text-church-purple active"
                    : isScrolled
                    ? "text-gray-700"
                    : "text-gray-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Media and Donate Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2">
              <Link
                href="https://www.facebook.com/kliconline/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hover:text-church-purple transition-colors",
                  isScrolled ? "text-gray-700" : "text-gray-700"
                )}
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/kliconline/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hover:text-church-purple transition-colors",
                  isScrolled ? "text-gray-700" : "text-gray-700"
                )}
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hover:text-church-purple transition-colors",
                  isScrolled ? "text-gray-700" : "text-gray-700"
                )}
              >
                <Twitter size={20} />
              </Link>
            </div>
            {/* <Button className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900">
              <Link href="/donate" onClick={(e) => handleNavigation('/donate', e)}>Donate</Link>
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "p-2 rounded-md",
                isScrolled ? "text-gray-700" : "text-black"
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-white z-40 md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-col p-4 space-y-4 overflow-y-auto">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link
                      href={link.path}
                      onClick={(e) => handleNavigation(link.path, e)}
                      className={`text-lg font-medium p-2 ${
                        isActive(link.path)
                          ? "text-church-purple font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                {/* <motion.div
                  className="border-t border-gray-200 my-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Button className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900 w-full">
                    <Link href="/donate" onClick={(e) => handleNavigation('/donate', e)}>Donate</Link>
                  </Button>
                </motion.div> */}
                <motion.div
                  className="border-t border-gray-200 my-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex justify-center space-x-6 py-4">
                    <Link
                      href="https://www.facebook.com/kliconline/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-church-purple transition-colors"
                    >
                      <Facebook size={24} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/kliconline/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-church-purple transition-colors"
                    >
                      <Instagram size={24} />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-church-purple transition-colors"
                    >
                      <Twitter size={24} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
