"use client";

import { useEffect } from "react";
import BlogList from "@/components/blog/BlogList";
import { motion } from "framer-motion";

const Blog = ({ blogs }: { blogs: BlogT[] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white py-20">
            <div className="container mx-auto px-4  py-12 text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Blog
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
                Spiritual insights, teachings, and encouragement for your daily
                walk with God.
              </motion.p>
            </div>
          </div>

          {/* Blog List Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <BlogList blogs={blogs} />
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default Blog;
