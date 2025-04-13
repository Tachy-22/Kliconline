"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addDocument } from "@/actions/addDocument";
import { ContactMessage } from "@/types";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, query: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const messageData: Omit<ContactMessage, "id"> = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        query: formData.query,
        message: formData.message,
        submissionDate: new Date().toISOString(),
        replied: false,
      };

      const result = await addDocument<Omit<ContactMessage, "id">>(
        "contact-messages",
        messageData,
        "/contact"
      );

      if ("code" in result) {
        throw new Error(result.message);
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        query: "",
        message: "",
      });

      toast({
        title: "Message Sent!",
        description:
          "Thank you for contacting us. We'll get back to you shortly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white py-20">
            <div className="container py-12 mx-auto px-4 text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Contact Us
              </motion.h1>
              <motion.div
                className="w-20 h-1 bg-church-yellow mx-auto mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              ></motion.div>
              <motion.p
                className="text-lg max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                We&apos;d love to hear from you. Reach out to us with any
                questions, prayer requests, or feedback.
              </motion.p>
            </div>
          </div>

          {/* Contact Form and Info */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Contact Information */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-lg p-8 order-2 lg:order-1"
                >
                  <h2 className="text-3xl font-serif font-bold mb-6">
                    Get in Touch
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-church-yellow p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">Our Location</h3>
                        <p className="text-gray-600">
                          Main hall, Haxby Road Primary Academy. 154 Haxby Road,
                          Clinton, York Y031 8JN{" "}
                        </p>
                        <p className="text-gray-600">York Y031 8JN</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-church-yellow p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">Phone Number</h3>
                        <p className="text-gray-600">(+234) 7017871161</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-church-yellow p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">
                          Email Address
                        </h3>
                        <p className="text-gray-600">kliconline@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-church-yellow p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">
                          Service Hours
                        </h3>
                        <p className="text-gray-600">
                          Sunday: 9:00 AM - 11:30 PM
                        </p>
                        <p className="text-gray-600">
                          Thursday: 5:30 PM - 7:30 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2347.730396605168!2d-1.078548684068447!3d53.97127048011103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487931a050225407%3A0x40c7b4c35228b62c!2sHaxby%20Road%20Primary%20Academy!5e0!3m2!1sen!2suk!4v1624552933461!5m2!1sen!2suk"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title="Church Location"
                    ></iframe>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-lg p-8 order-1 lg:order-2"
                >
                  <h2 className="text-3xl font-serif font-bold mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          placeholder="+44 123 456 7890"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="query"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Subject
                        </label>
                        <Select
                          onValueChange={handleSelectChange}
                          value={formData.query}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General Inquiry">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="Prayer Request">
                              Prayer Request
                            </SelectItem>
                            <SelectItem value="Feedback">Feedback</SelectItem>
                            <SelectItem value="Partnership">
                              Partnership
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-church-purple hover:bg-church-purple-dark text-white w-full py-6"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
