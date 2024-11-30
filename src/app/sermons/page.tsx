import { fetchCollection } from "@/actions/fettchCollection";
import Sermons from "@/components/layouts/Sermons";
import React from "react";

const page = async () => {
  const sermons = await fetchCollection<SermonT>("sermons");

  console.log({ sermons });

  if ("items" in sermons) {
    return <Sermons sermons={sermons.items} />;
  }
  return <div>Error </div>;
//  return <div>Sermons</div>
};

export default page;
