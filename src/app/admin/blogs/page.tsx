import { fetchCollection } from "@/actions/fettchCollection";
import BlogsTable from "@/components/tables/BlogsTable";
import BlogEditor from "@/components/ui/BlogEditor";

const page = async () => {
  const blogs = await fetchCollection("blogs");

  console.log({ blogs });
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <p className="text-gray-600">Create and manage blog posts for the church website.</p>
      </div>
      <BlogsTable blogs={"items" in blogs ? (blogs.items as BlogT[]) : []} />
      <BlogEditor />
    </div>
  );
};

export default page;
