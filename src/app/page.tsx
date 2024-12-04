import { fetchCollection } from "@/actions/fettchCollection";
import Home from "@/components/layouts/Home";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
//import Sermons from "@/components/layouts/Sermons";
import React from "react";

const page = async () => {
  const sermons = await fetchCollection<SermonT>("sermons");

  console.log({ sermons });

  if ("items" in sermons) {
    return (
      <div>
        {" "}
        <Navbar />
        <Home sermons={sermons.items} />
        <Footer />
      </div>
    );
  }
  return <div>Error here</div>;
  //  return <div>Sermons</div>
};

export default page;
