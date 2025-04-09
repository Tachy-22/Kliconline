"use client";
import React from "react";



import BlogCard from "./BlogCard";

const BlogList = ({ blogs }: { blogs: BlogT[] }) => {
  return (
    <section className=" max-w-7xl mx-auto py-16 ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-[2rem]">
        <h1 className="text-3xl font-bold mt-2 uppercase  text-start lg:text-center">
          All Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
