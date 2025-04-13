import React from "react";
import { fetchDocument } from "@/actions/fetchDocument";
import { fetchCollection } from "@/actions/fetchCollection";
import RegisteredParticipantsTable from "@/components/events/tables/RegisteredParticipantsTable";

const page = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await params;
  const event = await fetchDocument<EventT>("events", eventId);
  const participants = await fetchCollection<ParticipantT>(
    "registered-participants",
    [["eventId", "==", event && !("code" in event) ? event.id : ""]]
  );

  if (!event || "code" in event || "code" in participants) {
    return <div>Error loading data</div>;
  }
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{event.data.title}</h1>
      <RegisteredParticipantsTable
        eventId={eventId}
        participants={participants}
      />
    </div>
  );
};

export default page;
