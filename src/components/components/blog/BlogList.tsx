import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

const BlogCard = ({ blog }: { blog: BlogT }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <Link href={`/blog/${blog.id}`}>
        <div className="h-[16rem] overflow-hidden">
          <img
            src={blog.imageUrls?.[0] || blog.images?.[0] || "/placeholder.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 object-center"
          />
        </div>
      </Link>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex flex-col  text-sm text-gray-500 mb-2">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatToMonthDayYear(blog.date)}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{blog.author}</span>
          </div>
        </div>
        <Link href={`/blog/${blog.id}`} className="group">
          <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-church-purple transition-colors">
            {blog.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {blog.excerpt}
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-2 w-full border-church-purple text-church-purple hover:bg-church-purple hover:text-white"
        >
          <Link
            href={`/blog/${blog.id}`}
            className="inline-flex items-center justify-center"
          >
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const BlogList = ({ blogs }: { blogs: BlogT[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogT[]>(blogs);

  // Filter blogs when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBlogs(blogs);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query)
    );
    
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold">
          Latest Articles
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-church-purple focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                title="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {filteredBlogs.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={searchQuery} // Re-animate when search results change
        >
          {filteredBlogs.map((blog) => (
            <motion.div key={blog.id} variants={itemVariants}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg 
            className="w-16 h-16 mx-auto text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M12 13a9 9 0 100-18 9 9 0 000 18z" 
            />
          </svg>
          <h3 className="text-xl font-bold text-gray-700">No articles found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search keywords</p>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;
