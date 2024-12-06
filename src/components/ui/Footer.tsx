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
          <p className="-4 text-sm">(480) 555-0103</p>
          <p className="-2 text-sm">4517 Washington Ave.</p>
          <p className="-2 text-sm">finsweet@example.com</p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="flex gap-8 ">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase text-sm">Quicklinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about-us" className="hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/sermons" className="hover:text-orange-500">
                  Sermons
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-orange-500">
                  Events
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-orange-500">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col h-full  gap-4">
            <h3 className="font-bold uppercase text-sm ">Connect</h3>
            <div className="flex items-center gap-4 -4">
              <a href="https://linkedin.com" className="hover:text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.225 0H1.771C.792 0 0 .792 0 1.771v20.453C0 23.208.792 24 1.771 24H22.23c.975 0 1.769-.792 1.769-1.771V1.771C24 .792 23.208 0 22.225 0zM7.263 20.452H3.638V9h3.625v11.452zm-1.813-13.14c-1.161 0-2.102-.945-2.102-2.105 0-1.161.945-2.102 2.102-2.102s2.102.945 2.102 2.102c-.002 1.161-.943 2.105-2.102 2.105zm15.055 13.14h-3.625v-5.63c0-1.342-.025-3.072-1.874-3.072-1.874 0-2.161 1.463-2.161 2.976v5.725H9.129V9h3.481v1.56h.05c.485-.922 1.675-1.892 3.45-1.892 3.688 0 4.369 2.427 4.369 5.586v6.198z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="hover:text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.837 9.837 0 01-2.828.775 4.942 4.942 0 002.163-2.724c-.949.561-2.005.968-3.127 1.184A4.927 4.927 0 0016.616 3c-2.737 0-4.952 2.215-4.952 4.944 0 .387.044.762.127 1.124-4.116-.206-7.76-2.177-10.2-5.167a4.928 4.928 0 00-.67 2.486c0 1.715.873 3.23 2.202 4.118a4.93 4.93 0 01-2.243-.618v.06c0 2.396 1.704 4.393 3.963 4.847a4.935 4.935 0 01-2.239.084c.632 1.973 2.464 3.41 4.632 3.451a9.867 9.867 0 01-6.1 2.104c-.394 0-.779-.023-1.161-.067A13.941 13.941 0 007.548 21c9.05 0 14-7.496 14-13.986 0-.213-.005-.426-.014-.636A10.014 10.014 0 0024 4.557z" />
                </svg>
              </a>
              <a href="https://facebook.com" className="hover:text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.983 3.196c1.057-.7 2.262-1.16 3.628-1.3 2.053-.182 4.16-.043 6.373.548 3.772.999 5.515 4.23 5.88 5.66.344 1.364.344 3.692.003 5.704-.348 1.808-2.093 4.658-5.875 5.671-1.792.505-3.712.657-5.489.578-1.279-.058-2.487-.258-3.514-.611a6.803 6.803 0 01-2.941-1.993c-.973-1.23-1.301-2.79-1.528-4.049-.166-.911-.209-1.81-.095-2.712C.713 5.532 2.292 2.936 4.983 3.196zm.102 4.403c.08-.023.202-.091.27-.136 1.016-.613 1.936-1.28 3.197-1.638.853-.236 2.03-.196 2.776.057.509.167 1.387.637 1.513 1.08.116.413-.065.987-.341 1.362-.464.62-1.13.912-1.67 1.335-1.055.797-1.315 1.508-1.195 2.833.08.865.337 1.746.804 2.625.203.367.442.73.808.926.234.127.582.236.953.236.542 0 .907-.04 1.228-.236.624-.378.883-1.123 1.11-1.73.553-1.53 1.132-2.91 1.645-4.328.478-1.324.706-2.496.945-3.793.162-.832.296-1.477.418-2.344.115-.815.237-1.627.353-2.45h.02C8.373.947.644 8.214 5.085 13.05z"></path>
                </svg>
              </a>
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
                          className="w-full h-full bg-transparent border-none focus:outline-none text-gray-300"
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
