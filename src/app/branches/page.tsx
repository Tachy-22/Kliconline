import React from "react";
import Branches from "@/components/layouts/Branches";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getAllBranches } from "@/lib/helpers";

const Page = async () => {
  const branchData = await getAllBranches();

  return (
    <div className="min-h-screen">
      <Navbar />

      <Branches branchData={branchData} />
      <Footer />
    </div>
  );
};

export default Page;

export const revalidate = 0;

