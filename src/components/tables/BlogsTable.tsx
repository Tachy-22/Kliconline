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

const BlogsTable = ({ blogs }: { blogs: BlogT[] }) => {
  const slideIn = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  if (!blogs || blogs.length === 0) {
    return (
      <motion.div {...slideIn}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No blogs found</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div {...slideIn}>
      <Card className="min-w-full mx-auto !bg-white border-0">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">All Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="table-auto w-full">
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
                {blogs.map((blog, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      {blog.date instanceof Date
                        ? blog.date.toLocaleDateString()
                        : new Date(
                            blog.date.seconds * 1000
                          ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditModal title="Edit Blog">
                          <BlogEditor blog={blog} update />
                        </EditModal>
                        <DeleteConfirmationModal
                          id={blog.id as string}
                          collection="blogs"
                          name="blog"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogsTable;
