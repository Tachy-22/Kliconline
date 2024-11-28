import { fetchCollection } from "@/actions/fettchCollection";
import Events from "@/components/layouts/Events";
import React from "react";



const Page = async () => {
  const events = await fetchCollection("events");
  
  const validEvents = "items" in events 
    ? (events.items as EventT[]).filter(event => event && event.date)
    : [];

  return <Events events={validEvents} />;
};

export default Page;
