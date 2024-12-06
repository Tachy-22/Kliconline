import Admin from "@/components/layouts/Admin";
import { getDashboardStats } from "@/lib/helpers";
import { fetchCollection } from "@/actions/fettchCollection";
import React from "react";

const Page = async () => {
  const stats = await getDashboardStats();
  const sermonsResponse = await fetchCollection<SermonT>("sermons", {
    orderByField: "date",
    orderDirection: "desc",
    limitTo: 3
  });

  const recentSermons = "items" in sermonsResponse ? sermonsResponse.items : [];

  return <Admin stats={stats} recentSermons={recentSermons} />;
};

export default Page;
