import { fetchCollection } from "@/actions/fettchCollection";
import Testimonies from "@/components/layouts/testimonies";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const page = async () => {
  const testimonies = await fetchCollection<TestimonyT>("testimonies", {
    whereClause: [["approved", "==", true]]
  });

  return (
    <main>
      <Navbar />

      <Testimonies
        testimonies={"items" in testimonies ? testimonies.items : []}
      />
      <Footer />
    </main>
  );
};

export default page;
