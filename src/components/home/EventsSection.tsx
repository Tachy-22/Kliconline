import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventCard = ({
  title,
  date,
  time,
  location,
  image,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-church-yellow text-gray-900 px-3 py-1 font-bold rounded">
          {date}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-bold mb-3">{title}</h3>
        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-church-purple" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-church-purple" />
            <span>{location}</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-2 w-full border-church-purple text-church-purple hover:bg-church-purple hover:text-white"
        >
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
};

const EventsSection = ({ events }: { events: EventT[] }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Upcoming Events
            </h2>
            <div className="w-20 h-1 bg-church-yellow mb-6"></div>
            <p className="text-lg max-w-2xl text-gray-700">
              Join us for these special events and be part of what God is doing
              in our community.
            </p>
          </div>
          {/* <Button
            variant="link"
            className="text-church-purple hidden md:flex items-center"
          >
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              image={event.images?.[0] || event.mediaUrl || ""}
            />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button
            variant="link"
            className="text-church-purple flex items-center mx-auto"
          >
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
