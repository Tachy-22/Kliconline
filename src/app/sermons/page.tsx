import { fetchCollection } from "@/actions/fettchCollection";
import Sermons from "./Sermons";

export default async function SermonPage() {
  // Fetch sermons and events
  const sermons = await fetchCollection<SermonT>("sermons");
  const events = await fetchCollection<EventT>("events");

  // Sort sermons by date (newest first)
  const sortedSermons = "items" in sermons
    ? [...sermons.items].sort(
        (a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
      )
    : [];

  if (!("items" in sermons) || !("items" in events)) {
    return <div>Error loading sermons or events</div>;
  }

  return <Sermons sermons={sortedSermons} events={events.items} />;
}
