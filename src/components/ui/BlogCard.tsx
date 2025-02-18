"use client";

import React from "react";
import Link from "next/link";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

interface BlogCardProps {
  blog: BlogT;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { category, title, author, date, excerpt } = blog;

  return (
    <Link
      href={`blogs/${blog.id}`}
      className="bg-white relative rounded-lg shadow-md group py-10 flex flex-col gap-1 justify-between p-3 lg:px-8 overflow-hidden hover:shadow-lg w-full"
    >
      <p className="text-sm  text-yellow-400 font-semibold uppercase">
        {category}
      </p>
      <h3 className="text-xl font-bold text-gray-800 mt-2  ">{title}</h3>
      <p className="text-gray-600 mt-2 ">{excerpt}</p>
      <div className="pt-7  text-gray-500  font-semibold">
        By {author}
        <br />
        {formatToMonthDayYear(date)}
      </div>
      {/* Bottom Accent */}
      <div className="w-full h-3 bg-yellow-300 absolute bottom-0 group-hover:translate-y-0 translate-y-[50%] left-0 transition-all duration-300"></div>{" "}
    </Link>
  );
};

export default BlogCard;
