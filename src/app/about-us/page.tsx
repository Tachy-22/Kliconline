import About from "@/components/layouts/About";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <Navbar /> <About />
    </div>
  );
};

export default page;
