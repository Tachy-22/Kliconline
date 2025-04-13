//import { fetchCollection } from "@/actions/fettchCollection";

// import BranchesForm from "@/components/components/forms/BranchesForm";

const page = async () => {
 // const branches = await fetchCollection("branches");

  // const validBranches =
  //   "items" in branches
  //     ? (branches.items as BranchT[]).filter((branch) => branch && branch.name)
  //     : [];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Branch Management</h1>
        <p className="text-gray-600">Manage church branches and locations.</p>
      </div>
      {/* <BranchesTable branches={validBranches} /> */}
      {/* <BranchesForm /> */}
    </div>
  );
};

export default page;
