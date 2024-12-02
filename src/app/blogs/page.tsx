import Blogs from "@/components/layouts/Blogs";
import { fetchCollection } from "@/actions/fettchCollection";

import React from "react";

const page = async () => {
    const blogs = await fetchCollection("blogs");

  return <Blogs blogs={"items" in blogs ? (blogs.items as BlogT[]) : []} />;
};

export default page;
