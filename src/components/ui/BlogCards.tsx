import React from "react";
import { Blog } from "./BlogList";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { category, title, excerpt, author, date } = blog;

  return (
    <Link
      href={`blogs/${blog.title}`}
      className="bg-white relative rounded-lg shadow-md group py-10 flex flex-col gap-1 justify-between overflow-hidden hover:shadow-lg"
    >
      <p className="text-sm  px-8 text-orange-500 font-semibold uppercase">
        {category}
      </p>
      <h3 className="text-xl font-bold text-gray-800 mt-2  px-8">{title}</h3>
      <p className="text-gray-600 mt-2  px-8">{excerpt}</p>
      <div className="pt-7  text-gray-500  font-semibold px-8">
        By {author}
        <br />
        {date}
      </div>
      {/* Bottom Accent */}
      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 group-hover:translate-y-0 translate-y-[50%] left-0 transition-all duration-300"></div>{" "}
    </Link>
  );
};

export default BlogCard;
