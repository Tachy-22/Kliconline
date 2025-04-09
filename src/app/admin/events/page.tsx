import { fetchCollection } from "@/actions/fettchCollection";
import AddEventForm from "@/components/components/forms/AddEventForm";
import EventsTable from "@/components/components/tables/EventsTable";

const page = async () => {
  const events = await fetchCollection("events");

  // //console.log(events);
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <p className="text-gray-600">
          Manage upcoming church events and activities.
        </p>
      </div>
      <EventsTable
        events={"items" in events ? (events.items as EventT[]) : []}
      />
      <AddEventForm />
    </div>
  );
};

export default page;
