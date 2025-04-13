import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  PhoneCall,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-church-yellow">
              Kingdom Life International Church
            </h3>
            <p className="mb-4 text-gray-300">
              We are commissioned and anointed of God to teach and preach the
              kingdom of God.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/kliconline/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-church-yellow"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/kliconline/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-church-yellow"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-church-yellow"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-church-yellow">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-church-yellow transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sermons"
                  className="hover:text-church-yellow transition-colors"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-church-yellow transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonies"
                  className="hover:text-church-yellow transition-colors"
                >
                  Testimonies
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-church-yellow transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-church-yellow">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-church-purple" />
                <span>
                  Main hall, Haxby Road Primary Academy. 154 Haxby Road,
                  Clinton, York Y031 8JN
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="mr-2 h-5 w-5 text-church-purple" />
                <span>(+234) 7017871161</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-church-purple" />
                <span>kliconline@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-church-yellow">
              Newsletter
            </h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter to receive updates on our services and
              events.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 focus:border-church-yellow text-white"
              />
              <Button className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Kingdom Life International Church.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
