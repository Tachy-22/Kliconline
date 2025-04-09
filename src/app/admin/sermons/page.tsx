import { fetchCollection } from "@/actions/fettchCollection";
import AddSermonForm from "@/components/components/forms/AddSermonForm";
import SermonsTable from "@/components/components/tables/SermonsTable";

const page = async () => {
  const sermons = await fetchCollection<SermonT[]>("sermons");

  // //console.log({ sermons });

  if ("items" in sermons) {
    return (
      <div className="p-6 flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Sermon Management</h1>
          <p className="text-gray-600">
            Add, edit and manage church sermons here.
          </p>
        </div>
        <SermonsTable sermons={sermons.items as unknown as SermonT[]} />

        <AddSermonForm />
      </div>
    );
  }

  return <div>Error loading sermons</div>;
};

export default page;
