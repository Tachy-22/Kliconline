import { fetchCollection } from "@/actions/fettchCollection";
import AddSermonForm from "@/components/forms/AddSermonForm";
import SermonsTable from "@/components/tables/SermonsTable";

const page = async () => {
  const sermons = await fetchCollection<SermonT[]>("sermons");

  console.log({ sermons });

  if ("items" in sermons) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <SermonsTable sermons={sermons.items as unknown as SermonT[]} />

        <AddSermonForm />
      </div>
    );
  }

  return <div>Error loading sermons</div>;
};

export default page;
