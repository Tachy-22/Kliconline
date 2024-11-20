"use client";
import Link from "next/link";
import React from "react";

type OurBlogCardProps = {
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  blogId: string;
};

const OurBlogCard: React.FC<OurBlogCardProps> = ({
  category,
  title,
  description,
  author,
  date,
  blogId,
}) => {
  return (
    <Link
      href={`/blogs/${blogId}`}
      className="bg-[#FFF5EB] hover:shadow-2xl p-6 rounded-md transition-all duration-300 w-full h-full shadow-md relative group overflow-hidden"
    >
      <p className="text-sm uppercase text-[#ffd2a4] font-semibold">
        {category}
      </p>
      <h3 className="mt-2 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 text-sm text-gray-500">
        <p>By {author}</p>
        <p>{date}</p>
      </div>
      <div className="w-full h-3 bg-[#ffd2a4] absolute bottom-0 group-hover:translate-y-0 translate-y-[50%] left-0 transition-all duration-300"></div>
    </Link>
  );
};

export default OurBlogCard;
