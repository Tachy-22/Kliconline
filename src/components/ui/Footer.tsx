"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import { subscribeToNewsletter } from "@/actions/subscribe";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const Footer = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await subscribeToNewsletter(values.email);
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      form.reset();
    } catch {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer className="bg-[#161722] text-gray-300 py-10 h-full flex z-30 relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Brand and Contact */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-orange-500">{`Klic`}</h2>
          <p className="text-sm -4">&copy; Copyright MIT 2022</p>
          <p className="-4 text-sm">
            Visit our website:{" "}
            <a
              href="http://www.kliconline.org"
              className="hover:text-orange-500"
            >
              www.kliconline.org
            </a>
          </p>
          <p className="-2 text-sm">Email: finsweet@example.com</p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="flex gap-8 ">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase text-sm">Quicklinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-orange-500">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-orange-500">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-orange-500">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col h-full gap-4">
            <h3 className="font-bold uppercase text-sm ">Connect</h3>
            <div className="flex items-center gap-4 -4">
              <Link
                href="https://facebook.com/Kliconline"
                className="hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.225 0H1.771C.792 0 0 .792 0 1.771v20.453C0 23.208.792 24 1.771 24H22.23c.975 0 1.769-.792 1.769-1.771V1.771C24 .792 23.208 0 22.225 0zM7.263 20.452H3.638V9h3.625v11.452zm-1.813-13.14c-1.161 0-2.102-.945-2.102-2.105 0-1.161.945-2.102 2.102-2.102s2.102.945 2.102 2.102c-.002 1.161-.943 2.105-2.102 2.105zm15.055 13.14h-3.625v-5.63c0-1.342-.025-3.072-1.874-3.072-1.874 0-2.161 1.463-2.161 2.976v5.725H9.129V9h3.481v1.56h.05c.485-.922 1.675-1.892 3.45-1.892 3.688 0 4.369 2.427 4.369 5.586v6.198z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/Kliconline"
                className="hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.837 9.837 0 01-2.828.775 4.942 4.942 0 002.163-2.724c-.949.561-2.005.968-3.127 1.184A4.927 4.927 0 0016.616 3c-2.737 0-4.952 2.215-4.952 4.944 0 .387.044.762.127 1.124-4.116-.206-7.76-2.177-10.2-5.167a4.928 4.928 0 00-.67 2.486c0 1.715.873 3.23 2.202 4.118a4.93 4.93 0 01-2.243-.618v.06c0 2.396 1.704 4.393 3.963 4.847a4.935 4.935 0 01-2.239.084c.632 1.973 2.464 3.41 4.632 3.451a9.867 9.867 0 01-6.1 2.104c-.394 0-.779-.023-1.161-.067A13.941 13.941 0 007.548 21c9.05 0 14-7.496 14-13.986 0-.213-.005-.426-.014-.636A10.014 10.014 0 0024 4.557z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/kliconline//Kliconline"
                className="hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com/KLICECHURCH"
                className="hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
            <div className="mt-4 text-sm">
              <p>
                Audio Livestream:{" "}
                <a
                  href="https://mixlr.com/kliconline"
                  className="hover:text-orange-500"
                >
                  mixlr.com/kliconline
                </a>
              </p>
              <p>
                Video Livestream:{" "}
                <a
                  href="https://youtube.com/KLICECHURCH"
                  className="hover:text-orange-500"
                >
                  KLICECHURCH - YouTube
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Subscribe Section */}
        <div>
          <h3 className="font-bold uppercase text-sm mb-4">
            Subscribe to get latest updates and news
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center border border-orange-100/80 !rounded-xl overflow-hidden h-[3rem]">
                      <FormControl>
                        <Input
                          placeholder="Yourmail@gmail.com"
                          className="w-full h-full bg-transparent border-none focus:outline-none text-gray-300 placeholder:text-gray-600"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        className="bg-[#FFD2A4] text-[#161722] hover:bg-[#FFD2A4]/90 h-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
