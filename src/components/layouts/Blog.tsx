"use client";

import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

const Blog = ({ blogData }: { blogData: BlogT }) => {
  const { title, author, date, content, category, imageUrls } = blogData;
  const parsedContent = parse(content);

  return (
    <article className="max-w-[65rem] mx-auto px-2 sm:px-4 py-6 sm:py-12 bg-white">
      <header className="mb-8 sm:mb-12 flex flex-col gap-5">
        <h2 className="text-lg text-orange-500 font-bold  uppercase max-w-[30rem] mx-auto text-center">
          {category}{" "}
        </h2>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-900 text-center mx-auto max-w-[90%] w-fit ">
          {title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-600 text-sm sm:text-base">
          <span className="font-medium">{author}</span>
          <span>•</span>
          <time className="text-gray-500 dark:text-gray-500">{formatToMonthDayYear(date)}</time>
        </div>
        <div className="h-full w-full flex lg:col-span-2">
          {" "}
          <Image
            width={2000}
            height={2000}
            src={imageUrls[0] || "/hero-img.svg"}
            alt={title}
            className="w-full  h-[20rem] object-cover bg-gray-300"
          />
        </div>
      </header>
      <div className="prose prose-lg max-w-none dark:prose-invert:prose-light">{parsedContent} </div>
    </article>
  );
};

export default Blog;
