"use client";
import React from "react";
export interface Blog {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

export const blogs: Blog[] = [
  {
    category: "Relationship",
    title: "The Best Way to Inspire People",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Mathew Johnson",
    date: "Tuesday 13 May, 2018",
  },
  {
    category: "Relationship",
    title: "How to Show Compassion",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Mathew Johnson",
    date: "Tuesday 13 May, 2018",
  },
  {
    category: "Relationship",
    title: "The Biblical Purpose of Money",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Mathew Johnson",
    date: "Tuesday 13 May, 2018",
  },
  {
    category: "Relationship",
    title: "The Best Way to Inspire People",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Mathew Johnson",
    date: "Tuesday 13 May, 2018",
  },
  // Add 6 more blogs
  {
    category: "Relationship",
    title: "Finding Peace in Chaos",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Mathew Johnson",
    date: "Wednesday 14 May, 2018",
  },
  {
    category: "Leadership",
    title: "Keys to Leading Effectively",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Sarah Lee",
    date: "Monday 12 May, 2018",
  },
  {
    category: "Faith",
    title: "Overcoming Doubt in Faith",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "James Carter",
    date: "Friday 16 May, 2018",
  },
  {
    category: "Community",
    title: "Building Stronger Communities",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Emily White",
    date: "Sunday 18 May, 2018",
  },
  {
    category: "Health",
    title: "Spiritual Health and Wellness",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "John Smith",
    date: "Thursday 15 May, 2018",
  },
  {
    category: "Growth",
    title: "Personal Growth and Faith",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    author: "Jane Doe",
    date: "Saturday 17 May, 2018",
  },
];

import BlogCard from "./BlogCards";

const BlogList: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          All Blog Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
