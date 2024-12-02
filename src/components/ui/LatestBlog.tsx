"use client";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface BlogPost {
  date: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
}

// export const latestPost: BlogPost = {
//   date: "Tuesday 13 May, 2022",
//   author: "John Hinauj Deo",
//   title: "Church Was Doing What He Often Did When Dropped an Oracle",
//   excerpt:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   image: "hero-img.svg", // Replace with actual image path
// };

const LatestBlog = ({ blogs }: { blogs: BlogT[] }) => {
  const getLatestBlog = () => {
    const today = new Date();
    return blogs.reduce((closest, blog) => {
      const blogDate = new Date(blog.date); // Assumes `blog.date` is an ISO string or valid date format
      const closestDate = new Date(closest.date);

      const diffCurrent = Math.abs(today.getTime() - blogDate.getTime());
      const diffClosest = Math.abs(today.getTime() - closestDate.getTime());

      return diffCurrent < diffClosest ? blog : closest;
    }, blogs[0]);
  };
  const latestBlog = getLatestBlog();
  const { date, author, title, excerpt, imageUrls, id } = latestBlog;

  console.log({ latestBlog });

  return (
    <section className=" ">
      <div className=" flex flex-col gap-5 max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg uppercase text-gray-600  text-start lg:text-center">
          Our Blog
        </h2>
        <h1 className="text-3xl font-bold mt-2 uppercase  text-start lg:text-center">
          Most Recent Post
        </h1>
        <div className="bg-white rounded-lg  shadow-md grid lg:grid-cols-5  overflow-hidden">
          <div className="h-full w-full flex lg:col-span-2">
            {" "}
            <Image
              width={2000}
              height={2000}
              src={imageUrls[0]}
              alt={title}
              className="w-full  h-full object-cover bg-gray-300"
            />
          </div>

          <div className="p-6 flex flex-col justify-between lg:col-span-3">
            <div>
              <p className="text-sm text-gray-500">
                {formatToMonthDayYear(date)} <span className="mx-2">|</span> By{" "}
                {author}
              </p>
              <h2 className="text-2xl font-bold text-gray-800 mt-4">{title}</h2>
              <p className="text-gray-600 mt-4">{excerpt}</p>
            </div>
            <div className="mt-6">
              <Link
                href={`/blogs/${id}`}
                className="inline-block bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
