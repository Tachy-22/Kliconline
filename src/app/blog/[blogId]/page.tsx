import { fetchDocument } from "@/actions/fetchDocument";
import React from "react";
import BlogPost from "./BlogPost";
import { fetchCollection } from "@/actions/fettchCollection";

const page = async ({ params }: { params: Promise<{ blogId: string }> }) => {
  const { blogId } = await params;
  const blog = await fetchDocument<BlogT>("blogs", blogId);
  const blogsResult = await fetchCollection("blogs");
  const blogs = "items" in blogsResult ? (blogsResult.items as BlogT[]) : [];

 
  return (
   
    <>
      {blog && "data" in blog ? (
        <BlogPost blog={blog.data as BlogT} recentBlogs={blogs} />
      ) : (
        <div>Blog not found</div>
      )}
    </>
  );
};

export default page;
