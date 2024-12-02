import { fetchCollection } from "@/actions/fettchCollection";
import BlogsTable from "@/components/tables/BlogsTable";
import BlogEditor from "@/components/ui/BlogEditor";
import React from "react";

const page = async () => {
  const blogs = await fetchCollection("blogs");

  console.log({ blogs });
  return (
    <div className="w-full flex flex-col gap-4 ">
      <BlogsTable blogs={"items" in blogs ? (blogs.items as BlogT[]) : []} />
      <BlogEditor />
    </div>
  );
};

export default page;
