// import Blogs from "@/components/components/layouts/Blogs";
import { fetchCollection } from "@/actions/fettchCollection";

import React from "react";
import Blog from "./Blog";

const page = async () => {
  const blogs = await fetchCollection("blogs");

  return (
    <>
      <Blog blogs={"items" in blogs ? (blogs.items as BlogT[]) : []} />
      {/* <Blog /> */}
    </>
  );
};

export default page;

export const revalidate = 0;
