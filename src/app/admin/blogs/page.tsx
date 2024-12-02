import { fetchCollection } from "@/actions/fettchCollection";
//import BlogsTable from "@/components/tables/BlogsTable";
//import BlogEditor from "@/components/ui/BlogEditor";

const page = async () => {
  const blogs = await fetchCollection("blogs");

  console.log({ blogs });
  return (
    <div className="w-full flex flex-col gap-4 ">
      {/* <BlogsTable blogs={"items" in blogs ? (blogs.items as BlogT[]) : []} /> */}
      {/* <BlogEditor /> */}
      hey
    </div>
  );
};

export default page;
