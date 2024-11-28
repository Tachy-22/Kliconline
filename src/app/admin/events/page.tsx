import { fetchCollection } from "@/actions/fettchCollection";
import AddEventForm from "@/components/forms/AddEventForm";
import EventsTable from "@/components/tables/EventsTable";
import React from "react";

const page = async () => {
  //  const { events = [], success, error } = await fetchEvents();
  const events = await fetchCollection("events");

  console.log(events);
  return (
    <div className="w-full flex flex-col gap-4 ">
      <EventsTable events={'items' in events ? events.items as EventT[] : []} />
      <AddEventForm />
    </div>
  );
};

export default page;
