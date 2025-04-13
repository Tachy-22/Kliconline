"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonyForm from "./TestimonyForm";

const Testimonies = ({ testimonies }: { testimonies: TestimonyT[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // Take at most 2 initials
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white py-20">
            <div className="container mx-auto px-4 py-12 text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Testimonies
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
                Stories of how God has worked in the lives of our members
                through Kingdom Life International Church.
              </motion.p>
            </div>
          </div>

          {/* Featured Testimonies */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Our Victory Reports{" "}
                </h2>
                <div className="w-20 h-1 bg-church-purple mx-auto mb-6"></div>
                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                  Hear powerful stories of faith, healing, restoration, and
                  breakthroughs from our church members.
                </p>
              </div>

              <motion.div
                className="columns-1 md:columns-2 lg:columns-3 space-y-6 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {testimonies?.map((testimony, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="testimonial-card h-full flex flex-col break-inside-avoid mb-6"
                  >
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <Quote className="h-10 w-10 text-church-yellow" />
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-church-yellow"
                              fill="#FACC15"
                            />
                          ))}
                        </div>
                      </div>
                      <h2 className=" mb-6 font-bold">{testimony.title}</h2>
                      <p className="text-gray-700 mb-6 italic">
                        {testimony.content}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center">
                      {testimony.image ? (
                        <img
                          src={testimony.image}
                          alt={testimony.author}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full border-4 border-white shadow-md bg-church-purple flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {getInitials(testimony.author)}
                          </span>
                        </div>
                      )}
                      <div className="ml-4">
                        <h4 className="font-serif font-bold text-lg">
                          {testimony.author}
                        </h4>
                        <p className="text-sm text-gray-600">Church Member</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Share Your Testimony */}
          <section className="py-16 bg-church-purple text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  className="text-3xl md:text-4xl font-serif font-bold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Share Your Testimony
                </motion.h2>
                <motion.div
                  className="w-20 h-1 bg-church-yellow mx-auto mb-6"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
                <motion.p
                  className="text-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Has God done something amazing in your life through our
                  ministry? We would love to hear about it and share it to
                  encourage others.
                </motion.p>
                <Button
                  className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900 px-8 py-6 text-lg"
                  onClick={openModal}
                >
                  Submit Your Testimony
                </Button>
              </div>
            </div>
          </section>

          {/* Testimony Submission Modal */}
          <TestimonyForm isOpen={isModalOpen} onClose={closeModal} />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonies;
