"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import parse from "html-react-parser";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

const BlogPost = ({
  blog,
  recentBlogs,
}: {
  blog: BlogT;
  recentBlogs: BlogT[];
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [todayVerse, setTodayVerse] = useState({ text: "", reference: "" });
  const parsedContent = parse(blog.content);

  // Filter out the current blog from recentBlogs
  const filteredRecentBlogs = recentBlogs.filter(
    (recentBlog) => recentBlog.id !== blog.id
  );

  useEffect(() => {
    // Set the current URL when component mounts (client-side only)
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);

      // Get current day of week (0-6, where 0 is Sunday)
      const dayOfWeek = new Date().getDay();

      // Array of verses for each day of the week
      const dailyVerses = [
        {
          text: "This is the day the LORD has made; let us rejoice and be glad in it.",
          reference: "Psalm 118:24",
        },
        {
          text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          reference: "Proverbs 3:5-6",
        },
        {
          text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me.",
          reference: "Psalm 28:7",
        },
        {
          text: "I can do all this through him who gives me strength.",
          reference: "Philippians 4:13",
        },
        {
          text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
          reference: "Joshua 1:9",
        },
        {
          text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
          reference: "John 3:16",
        },
        {
          text: "For I know the plans I have for you, declares the LORD, 'plans to prosper you and not to harm you, plans to give you hope and a future.'",
          reference: "Jeremiah 29:11",
        },
      ];

      // Set today's verse based on the day of the week
      setTodayVerse(dailyVerses[dayOfWeek]);
    }
  }, []); // Social sharing functions with improved sharing messages

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}&quote=${encodeURIComponent(
      `This just blessed me! "${blog.title}" - Read here:`
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const text = `This just blessed me! "${blog.title}" - Read here:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank", "width=600,height=300");
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{"Blog post not found"}</h2>
            <Button asChild>
              <Link href="/blog">Return to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Image */}
          <div
            className="w-full h-[40vh] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${
                blog.imageUrls?.[0] || blog.images?.[0] || "/placeholder.jpg"
              })`,
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-end pb-10 py-12">
              <div className="text-white">
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {blog.title}
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Blog Post Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8 flex items-center text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatToMonthDayYear(blog.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {/* Excerpt as an introduction */}
                  {/* {blog.excerpt && (
                    <p className="text-lg leading-relaxed mb-6 font-medium">
                      {blog.excerpt}
                    </p>
                  )} */}

                  {/* Main blog content */}
                  <div className="prose prose-lg max-w-none ">
                    {parsedContent}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap justify-between items-center">
                    <Button variant="outline" asChild>
                      <Link href="/blog" className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                      </Link>
                    </Button>

                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={shareToFacebook}
                        title="Share to Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={shareToTwitter}
                        title="Share to Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="font-serif text-xl font-bold mb-4">
                    Recent Posts
                  </h3>
                  <ul className="space-y-4">
                    {filteredRecentBlogs.slice(0, 4).map((recentPost) => (
                      <li key={recentPost.id}>
                        <Link
                          href={`/blog/${recentPost.id}`}
                          className="hover:text-church-purple transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="w-16 h-16 flex-shrink-0 mr-4">
                              <img
                                src={
                                  recentPost.imageUrls?.[0] ||
                                  recentPost.images?.[0] ||
                                  "/placeholder.jpg"
                                }
                                alt={recentPost.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium line-clamp-2">
                                {recentPost.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {formatToMonthDayYear(recentPost.date)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-church-purple text-white p-6 rounded-lg">
                  <h3 className="font-serif text-xl font-bold mb-4">
                    Verse of the Day
                  </h3>
                  <blockquote className="italic mb-4">
                    &quot;{todayVerse.text}&quot;
                  </blockquote>
                  <p className="text-right text-sm">- {todayVerse.reference}</p>
                  <div className="mt-3 bg-opacity-20 bg-white rounded p-3">
                    <p className="text-sm">
                      Reflect on God&apos;s promises and find peace in His
                      perfect plan for your life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BlogPost;
