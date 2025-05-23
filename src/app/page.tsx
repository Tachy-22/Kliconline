import { fetchCollection } from "@/actions/fettchCollection";
// import Home from "@/components/layouts/Home";
// import Footer from "@/components/ui/Footer";
// import Navbar from "@/components/ui/Navbar";
//import Sermons from "@/components/layouts/Sermons";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import PastorsSection from "@/components/home/PastorsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
//import EventsSection from "@/components/home/EventsSection";
import SermonsSection from "@/components/home/SermonsSection";
import BlogSection from "@/components/home/BlogSection";
//import DonateSection from "@/components/home/DonateSection";
import LatestEventSection from "@/components/home/LatestEventSection";
import Footer from "@/components/layout/Footer";

const page = async () => {
  const sermons = await fetchCollection<SermonT>("sermons");
  const blogs = await fetchCollection<BlogT>("blogs", { limitTo: 3 });
  const events = await fetchCollection<EventT>("events");
  const testimonies = await fetchCollection<TestimonyT>("testimonies", {
    whereClause: [["approved", "==", true]],
  });

  let mostRecentEvent: EventT | null = null;
  if ("items" in events && events.items.length > 0) {
    mostRecentEvent = events.items.reduce((latest, current) => {
      const latestDate = new Date(latest.date);
      const currentDate = new Date(current.date);
      return currentDate > latestDate ? current : latest;
    }, events.items[0]);
  }

  // const upcomingEvents = ("items" in events)
  //   ? events.items.filter(evt => new Date(evt.date) < new Date())
  //   : [];

  // Get the 6 most recent sermons by date
  const recentSermons =
    "items" in sermons
      ? sermons.items
          .sort(
            (a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
          )
          .slice(0, 6)
      : [];

  // Sort blogs by date (newest first) and take the first 2
  const recentBlogs =
    "items" in blogs
      ? blogs.items
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 2)
      : [];

  if ("items" in sermons && "items" in blogs) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <ProgramsSection />
          <LatestEventSection event={mostRecentEvent} />
          <PastorsSection />
          {"items" in testimonies ? (
            <TestimonialsSection testimonies={testimonies.items} />
          ) : (
            <div>Error loading testimonies</div>
          )}
          {/* <EventsSection events={upcomingEvents} /> */}
          <SermonsSection
            sermons={recentSermons}
            events={"items" in events ? events.items : []}
          />
          <BlogSection blogs={recentBlogs} />
          {/* <DonateSection /> */}
        </main>
        <Footer />
      </div>
    );
  }
  return <div>Error here</div>;
  //  return <div>Sermons</div>
};

export default page;
