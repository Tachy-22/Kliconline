import Footer from "@/components/components/layout/Footer";
import Navbar from "@/components/components/layout/Navbar";
import React from "react";

export const revalidate = 0;

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
