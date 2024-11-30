import { fetchCollection } from "@/actions/fettchCollection";
import Home from "@/components/layouts/Home";
//import Sermons from "@/components/layouts/Sermons";
import React from "react";

const page = async () => {
  const sermons = await fetchCollection<SermonT>("sermons");

  console.log({ sermons });

  if ("items" in sermons) {
    return <Home sermons={sermons.items} />;
  }
  return <div>Error here</div>;
  //  return <div>Sermons</div>
};

export default page;
