import React from "react";
import BlogCard from "./OurBlogCard";

const OurBlogs: React.FC = () => {
  const blogs = [
    {
      category: "Faith",
      title: "How to Strengthen Your Prayer Life",
      description:
        "Discover practical ways to deepen your connection with God through daily prayer.",
      author: "Pastor Sarah Williams",
      date: "Sunday 12 November, 2024",
      blogId: "llD6PDyPRahtUgTS19sL",
    },
    {
      category: "Community",
      title: "Serving Others: The Heart of the Church",
      description:
        "Explore how serving in your local community reflects God’s love and purpose.",
      author: "Brother James Carter",
      date: "Friday 8 November, 2024",
            blogId: "llD6PDyPRahtUgTS19sL",

      //blogId: "2",
    },
    {
      category: "Worship",
      title: "The Power of Worship in Challenging Times",
      description:
        "Learn how worship can uplift your spirit and strengthen your faith during tough times.",
      author: "Sister Grace Lee",
      date: "Tuesday 5 November, 2024",
            blogId: "llD6PDyPRahtUgTS19sL",

      //blogId: "1",
    },
    {
      category: "Events",
      title: "Upcoming Christmas Service and Celebrations",
      description:
        "Join us for a joyful Christmas service and community celebration this December!",
      author: "Church Admin Team",
      date: "Monday 20 November, 2024",
            blogId: "llD6PDyPRahtUgTS19sL",

      //blogId: "1",
    },
  ];

  return (
    <section className="py-[6rem] flex flex-col gap-12">
      <div className="text-center flex flex-col gap-3">
        <p className="text-lg uppercase text-gray-600">Read Our Blog</p>
        <h2 className="text-3xl font-bold">Share, Inspire, Innovate</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            date={blog.date}
            blogId={blog.blogId}
          />
        ))}
      </div>
    </section>
  );
};

export default OurBlogs;
