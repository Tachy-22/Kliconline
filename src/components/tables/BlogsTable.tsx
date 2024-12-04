"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Replace with your table component path
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { EditModal } from "../modals/EditModal";
import { DeleteConfirmationModal } from "../modals/DeleteConfirmationModal";
import BlogEditor from "../ui/BlogEditor";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

const BlogsTable = ({ blogs }: { blogs: BlogT[] }) => {
  const success = Array.isArray(blogs) || "items" in blogs;
  const error = !success ? "Failed to load blogs" : null;
  const loading = !success && !error;
  const slideIn = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  if (error) {
    return (
      <motion.div {...slideIn}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div {...slideIn}>
        <Card className="min-w-full mx-auto !bg-white border-0">
          <CardContent className="flex justify-center p-4">
            Loading...
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={slideIn.initial}
      animate={slideIn.animate}
      transition={slideIn.transition}
    >
      <Card className="min-w-full mx-auto !bg-white border-0">
        <CardHeader>
          <CardTitle >All Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No blogs found
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>{formatToMonthDayYear(blog.date)}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal title="Edit Blog">
                          <BlogEditor blog={blog} update />
                          {/* <div>hi</div> */}
                        </EditModal>
                        <DeleteConfirmationModal
                          id={blog.id as string}
                          collection="blogs"
                          name="blog"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogsTable;
