import { LatestEventCard } from "../events/LatestEventCard";

const LatestEventSection = ({ event }: { event: EventT | null }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Latest Event
          </h2>
          <div className="w-20 h-1 bg-church-yellow mb-6"></div>
          <p className="text-lg max-w-2xl text-gray-700">
            Don&apos;t miss out on our upcoming special events. Register now to
            secure your spot!
          </p>
        </div>

        {event ? (
          <LatestEventCard
            title={event.title}
            description={event.description}
            date={event.date}
            time={event.time}
            location={event.location}
            image={(event.images?.[0] as string) || (event.mediaUrl as string)}
          />
        ) : (
          <p>No recent event available.</p>
        )}
      </div>
    </section>
  );
};

export default LatestEventSection;
