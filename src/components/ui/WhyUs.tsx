"use client";
import Image from "next/image";

const WhyUs = () => {
  const benefits = [
    {
      id: 1,
      title: "WATCH AND LISTEN TO OUR SERMONS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      imageUrl: "/benefit-img-1.jpg", // Replace with actual image paths
    },
    {
      id: 2,
      imageUrl: "/benefit-img-2.jpg", // Replace with actual image paths
      title: "Explore the Teachings of the Bible",
      description:
        "Dive into deep, insightful teachings from the Bible, guiding you through life’s challenges.",
    },
    {
      id: 3,
      imageUrl: "/benefit-img-3.jpg", // Replace with actual image paths
      title: "Connect with a Faithful Community",
      description:
        "Become part of a loving, supportive community that shares your faith and values.",
    },
    {
      id: 4,
      imageUrl: "/benefit-img-4.jpg", // Replace with actual image paths
      title: "Participate in Enriching Worship",
      description:
        "Join us for powerful worship sessions that bring you closer to God and renew your spirit.",
    },
  ];

  return (
    <div className="bg-gray-100 py-[5rem] px-2">
      <div className="text-center mb-10">
        <p className="text-lg uppercase text-gray-600">WHY KLIC ?</p>
        <h2 className="text-3xl font-bold text-gray-800">
          Why Join Our Church
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-7xl mx-auto rounded-xl border-x-4 shadow-2xl border-red-400 overflow-hidden p-2 ">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="relative group h-[20rem] overflow-hidden"
          >
            <Image
              src={benefit.imageUrl}
              alt={benefit.title}
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg "
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50 flex flex-col justify-end p-4 rounded-lg ">
              <h3 className="text-white uppercase font-semibold text-lg translate-y-[100%] group-hover:translate-y-0 transition-all duration-300 text-center">
                {benefit.title}
              </h3>
              {benefit.description && (
                <p className="text-white text-sm mt-2  translate-y-[150%] group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 ">
                  {benefit.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
