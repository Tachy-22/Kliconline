export const revalidate = 0;

import { fetchCollection } from "@/actions/fettchCollection";
import Testimonies from "./Testimonies";
// import Testimonies from "@/components/components/layouts/testimonies";
// import Footer from "@/components/components/ui/Footer";
// import Navbar from "@/components/components/ui/Navbar";

const page = async () => {
  const testimonies = await fetchCollection<TestimonyT>("testimonies", {
    whereClause: [["approved", "==", true]],
  });

  return (
    <main>
      {/* <Navbar />

      <Testimonies
        testimonies={"items" in testimonies ? testimonies.items : []}
      />
      <Footer /> */}
      <Testimonies
        testimonies={"items" in testimonies ? testimonies.items : []}
      />
    </main>
  );
};

export default page;
