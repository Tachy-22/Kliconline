import React from "react";
import LatestBlog from "../ui/LatestBlog";
import BlogList from "../ui/BlogList";

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <LatestBlog />
      <BlogList />
    </div>
  );
};

export default Blogs;
