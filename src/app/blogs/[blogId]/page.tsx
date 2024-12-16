import { fetchDocument } from "@/actions/fetchDocument";
import Blog from "@/components/layouts/Blog";
import React from "react";

const page = async ({ params }: { params: Promise<{ blogId: string }> }) => {
  const { blogId } = await params;
  const blog = await fetchDocument<BlogT>("blogs", blogId);

  if (!blog) {
    return <div>Blog not found</div>;
  }


  return (
    <Blog
      blogData={
        "data" in blog ? (blog.data as BlogT) : (null as unknown as BlogT)
      }
    />
  );
};

export default page;
