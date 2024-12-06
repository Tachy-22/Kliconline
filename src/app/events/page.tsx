import { fetchCollection } from "@/actions/fettchCollection";
import Events from "@/components/layouts/Events";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const Page = async () => {
  const events = await fetchCollection("events");

  const validEvents =
    "items" in events
      ? (events.items as EventT[]).filter((event) => event && event.date)
      : [];

  return (
    <div>
      {" "}
      <Navbar />
      <Events events={validEvents} />
      <Footer />
    </div>
  );

  // return <div>Events page</div>
};

export default Page;
