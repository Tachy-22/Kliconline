"use client";

import React from "react";
import LatestBlog from "../../ui/LatestBlog";
import BlogList from "../../ui/BlogList";

const Blogs = ({ blogs }: { blogs: BlogT[] }) => {
  return (
    <div className=" bg-gray-50    py-[3rem] mx-auto">
      <LatestBlog blogs={blogs} />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blogs;
