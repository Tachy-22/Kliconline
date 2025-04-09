import { fetchCollection } from "@/actions/fettchCollection";
import BlogEditor from "@/components/components/BlogEditor";
import BlogsTable from "@/components/components/tables/BlogsTable";



const page = async () => {
  const blogs = await fetchCollection("blogs");

  // //console.log({ blogs });
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <p className="text-gray-600">
          Create and manage blog posts for the church website.
        </p>
      </div>
      <BlogsTable blogs={"items" in blogs ? (blogs.items as BlogT[]) : []} />
      <BlogEditor />
    </div>
  );
};

export default page;
