import { fetchCollection } from "@/actions/fettchCollection";
import Sermons from "@/components/layouts/Sermons";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const page = async () => {
  const sermons = await fetchCollection<SermonT>("sermons");

  console.log({ sermons });

  if ("items" in sermons) {
    return (
      <div>
        {" "}
        <Navbar />
        <Sermons sermons={sermons.items} />
        <Footer />
      </div>
    );
  }
  return <div>Error </div>;
//  return <div>Sermons</div>
};

export default page;
