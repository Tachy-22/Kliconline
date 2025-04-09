import Loader from "@/components/components/ui/Loader";
import React from "react";

const loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
      <span className="mt-[6rem]"> loading...</span>
    </div>
  );
};

export default loader;
