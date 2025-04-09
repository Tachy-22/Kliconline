import React from "react";
import Branches from "./Branches";

//import { getAllBranches } from "@/lib/helpers";

const Page = async () => {
//  const branchData = await getAllBranches();

  return (
    <div className="min-h-screen">
      {/* <Branches branchData={branchData} /> */}

      <Branches />
    </div>
  );
};

export default Page;

export const revalidate = 0;
