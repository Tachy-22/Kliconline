import React from "react";
import LatestBlog from "../ui/LatestBlog";
import BlogList from "../ui/BlogList";

const Blogs = () => {
  return (
    <div className=" bg-gray-50    py-[3rem] mx-auto">
      <LatestBlog />
      <BlogList />
    </div>
  );
};

export default Blogs;
