import { getDashboardStats } from "@/lib/helpers";
import { fetchCollection } from "@/actions/fettchCollection";
import React from "react";
import Admin from "@/components/components/layouts/Admin";

const Page = async () => {
  const stats = await getDashboardStats();
  const sermonsResponse = await fetchCollection<SermonT>("sermons", {
    orderByField: "date",
    orderDirection: "desc",
    limitTo: 3,
  });

  const recentSermons = "items" in sermonsResponse ? sermonsResponse.items : [];

  return <Admin  stats={stats} recentSermons={recentSermons} />;
};

export default Page;
