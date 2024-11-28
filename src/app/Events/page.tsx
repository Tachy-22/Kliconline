import { fetchCollection } from "@/actions/fettchCollection";
import Events from "@/components/layouts/Events";
import React from "react";

const Page = async () => {
  const events = await fetchCollection("events");

  return <Events events={"items" in events ? (events.items as EventT[]) : []} />;
};

export default Page;
