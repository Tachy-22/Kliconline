import React from 'react'
import { fetchCollection } from "@/actions/fettchCollection";
import MessagesTable from "@/components/tables/MessagesTable";

export default async function MessagesPage() {
  const result = await fetchCollection<ContactMessage>("contact-messages", {
    orderByField: "submissionDate",
    orderDirection: "desc"
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Messages Management</h1>
        <p className="text-gray-600">View and manage contact form submissions.</p>
      </div>
      <MessagesTable messages={"items" in result ? (result.items as ContactMessage[]) : []} />
    </div>
  );
}