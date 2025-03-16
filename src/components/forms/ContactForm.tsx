"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { addDocument } from "@/actions/addDocument";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  query: z
    .string()
    .min(2, "Query must be at least 2 characters")
    .max(100, "Query must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

const ContactForm = () => {
  const { toast } = useToast();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  //  //console.log(isLoading);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      query: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const contactData = {
        ...data,
        submissionDate: new Date().toISOString(),
        replied: false, // Add replied status
      };

      const result = await addDocument(
        "contact-messages",
        contactData,
        path as string
      );
      if ("code" in result) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            result.message || "Something went wrong. Please try again.",
        });
      } else {
        form.reset();
        toast({
          title: "Success",
          description: "Your message has been sent successfully!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-6 lg:py-12 bg-[#f9f4f0]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-3 lg:px-5">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Contact Us</h2>
          <p className="text-gray-600 mb-8 text-sm">
            Fill out the form below and we&apos;ll get back to you shortly.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className={`w-full p-6 bg-white border-gray-300 rounded placeholder:text-gray-500 ${
                          isLoading ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className={`w-full p-6 bg-white border-gray-300 rounded placeholder:text-gray-500 ${
                          isLoading ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query Related</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Specify your query"
                        className={`w-full p-6 bg-white border-gray-300 rounded placeholder:text-gray-500 ${
                          isLoading ? "cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message"
                        className={`w-full p-6 bg-white border-gray-300 rounded placeholder:text-gray-500 ${
                          isLoading ? "cursor-not-allowed" : ""
                        }`}
                        rows={5}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-yellow-300 font-semibold hover:bg-yellow-200 text-black transition duration-300 focus:ring-2 focus:ring-black focus:ring-offset-2 rounded w-full"
              >
                {isLoading ? "SUBMITING..." : "SEND MESSAGE"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex flex-col space-y-8 pt-4">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Address
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              NH 234 PUBLIC SQUARE <br />
              SAN FRANCISCO 65368
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Contact Details
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              <span className="block hover:text-gray-900 transition-colors">
                (480) 555-0103
              </span>
              <span className="block hover:text-gray-900 transition-colors">
                FINSWEET@EXAMPLE.COM
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Find us here
            </h3>
            <div className="flex space-x-6 mt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
