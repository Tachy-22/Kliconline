"use client";

import React from "react";
import parse from "html-react-parser";

interface BlogProps {
  blogData: {
    title: string;
    author: string;
    date: string;
    content: string;
    category: string;
  };
}

const Blog = ({ blogData }: BlogProps) => {
  const { title, author, date, content, category } = blogData;
  const parsedContent = parse(content);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      <header className="mb-8 sm:mb-12 flex flex-col gap-5">
        <h2 className="text-lg text-orange-500 font-bold  uppercase max-w-[30rem] mx-auto text-center">
          {category}{" "}
        </h2>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900 text-center mx-auto max-w-[90%] w-fit ">
          {title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-gray-600 text-sm sm:text-base">
          <span className="font-medium">{author}</span>
          <span>•</span>
          <time className="text-gray-500">{date}</time>
        </div>
      </header>
      <div className="prose prose-lg max-w-none">{parsedContent} </div>
    </article>
  );
};

export default Blog;
