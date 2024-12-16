import About from "@/components/layouts/About";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <Navbar /> <About />
      <Footer />
    </div>
  );
};

export default page;

export const revalidate = 0;
