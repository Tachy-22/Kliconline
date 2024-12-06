import { fetchCollection } from "@/actions/fettchCollection";
import TestimonyTable from "@/components/tables/TestimonyTable";

const page = async () => {
  const testimonies = await fetchCollection<TestimonyT>("testimonies", {
    //   whereClause: [["approved", "==", true]],
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Testimonies Management</h1>
        <p className="text-gray-600">
          View and manage Testimony submissions.
        </p>
      </div>
      <TestimonyTable
        testimonies={
          "items" in testimonies ? (testimonies.items as TestimonyT[]) : []
        }
      />
    </div>
  );
};

export default page;
