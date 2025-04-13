"use client";

import { useState, useEffect } from "react";
//import  { ContentEditableEvent } from "react-simple-wysiwyg";
import Blog from "./layouts/Blog";
import { usePathname } from "next/navigation";
import { updateDocument } from "@/actions/updateDocument";
import { addDocument } from "@/actions/addDocument";
import { Plus, X } from "lucide-react";
import SubmitButton from "./ui/SubmitButton";
import JEditor from "./ui/JoditEditor";
import { FileInput } from "./ui/FileInput";
import { Button } from "./ui/button";

//import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface BlogEditorProps {
  update?: boolean;
  blog?: BlogT;
  onClose?: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  update = false,
  blog,
  onClose,
}) => {
  const defaultBlogData = {
    title: "New Title",
    author: "New Author",
    date: new Date(),
    content: "<b>Dummy text</b>",
    category: "Uncategorized",
    imageUrls: [],
    excerpt: "Message Excerpt",
  };

  const path = usePathname();
  const [blogData, setBlogData] = useState<BlogT>(
    update && blog ? (blog as BlogT) : (defaultBlogData as unknown as BlogT)
  );
  const [isFormOpen, setIsFormOpen] = useState(update);

  const handleUploadComplete = (files: FileMetadata[]) => {
    const urls = files.map((file) => file.url);
    setBlogData((prev) => ({ ...prev, imageUrls: urls }));
  };

  useEffect(() => {
    if (update && blog) {
      setBlogData(blog as BlogT);
      setIsFormOpen(true);
    }
  }, [update, blog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJEditorChange = (contentString: string) => {
    setBlogData((prev) => ({ ...prev, content: contentString }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (update && blog) {
        await updateDocument("blogs", blog?.id as string, blogData, path);
        onClose?.();
        setIsFormOpen(false);
      } else {
        await addDocument("blogs", blogData, path);
        setBlogData(defaultBlogData as unknown as BlogT);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-full min-h-[90vh] flex flex-col gap-3">
      {!update && (
        <Button
          className={`w-fit py-3 font-medium rounded-xl ${
            isFormOpen
              ? "border-black border text-black hover:bg-black hover:text-white"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
          onClick={() => setIsFormOpen((prev) => !prev)}
        >
          {!isFormOpen ? (
            <span className="flex  items-center justify-between gap-2">
              {" "}
              Add New Blog <Plus />
            </span>
          ) : (
            <span className="flex  items-center justify-between gap-2">
              {" "}
              Close <X />
            </span>
          )}
        </Button>
      )}
      {isFormOpen && (
        <form
          className=" flex flex-col gap-6 pt-[3rem]"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
            {/* Blog Form */}
            <div className="bg-white overflow-hidden h-full rounded-l-xl  flex flex-col min-h-full">
              {/* <Editor
                value={blogData.content}
                onChange={handleEditorChange}
                className=" border-gray-300 rounded-lg p-3 focus:outline-none max  h-full min-h-[70vh]"
              /> */}
              <div className=" flex flex-col gap-4 px-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={blogData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter blog title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={blogData.author}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter author name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="excerpt"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Excerpt
                  </label>
                  <input
                    type="text"
                    id="excerpt"
                    name="excerpt"
                    value={blogData.excerpt}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter brief excerpt"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={blogData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Uncategorized">Uncategorized</option>
                    <option value="Family">Family</option>
                    <option value="Love">Love</option>
                    <option value="Community">Community</option>
                    <option value="Power">Power</option>
                  </select>

                  <div className="col-span-1 md:col-span-2 gap-3 fles flex-col py-[1rem]">
                    <div className=" pb-3 text-gray-900">Add Display Image</div>
                    <FileInput
                      multiple={false}
                      accept="image/*"
                      maxFileSize={2}
                      onUploadComplete={handleUploadComplete}
                      initialFiles={blogData?.imageUrls || []}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4">
                {" "}
                {typeof window !== "undefined" && (
                  <JEditor
                    value={blogData.content}
                    placeholder="placeholder..."
                    onChange={handleJEditorChange}
                  />
                )}
              </div>
            </div>
            {/* Blog Preview */}
            <div className="bg-white px-2  rounded-r-xl border-gray-400 border overflow-auto h-full">
              <Blog blogData={blogData} />
            </div>
          </div>
          <SubmitButton
            loadingtext="Uploading..."
            className="w-full bg-black text-white py-6 rounded text-sm font-semibold hover:bg-gray-800 transition"
          >
            Upload
          </SubmitButton>
        </form>
      )}
    </div>
  );
};

export default BlogEditor;
