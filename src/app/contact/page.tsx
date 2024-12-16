export const revalidate = 0;

import Contact from "@/components/layouts/Contact";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
};

export default page;
