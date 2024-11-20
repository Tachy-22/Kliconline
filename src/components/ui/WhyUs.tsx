"use client";
import Image from "next/image";

const WhyUs = () => {
  const benefits = [
    {
      id: 1,
      title: "WATCH AND LISTEN TO OUR SERMONS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      imageUrl: "/hero-img.svg", // Replace with actual image paths
    },
    {
      id: 2,
      imageUrl: "/hero-img.svg", // Replace with actual image paths
      title: "Explore the Teachings of the Bible",
      description:
        "Dive into deep, insightful teachings from the Bible, guiding you through life’s challenges.",
    },
    {
      id: 3,
      imageUrl: "/hero-img.svg", // Replace with actual image paths
      title: "Connect with a Faithful Community",
      description:
        "Become part of a loving, supportive community that shares your faith and values.",
    },
    {
      id: 4,
      imageUrl: "/hero-img.svg", // Replace with actual image paths
      title: "Participate in Enriching Worship",
      description:
        "Join us for powerful worship sessions that bring you closer to God and renew your spirit.",
    },
  ];

  return (
    <div className="bg-gray-100 py-[5rem]">
      <div className="text-center mb-10">
        <p className="text-lg uppercase text-gray-600">WHY KLIC ?</p>
        <h2 className="text-3xl font-bold text-gray-800">
          The Benefits of Joining Our Church
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
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
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg ">
              <h3 className="text-white uppercase font-semibold text-lg translate-y-[100%] group-hover:translate-y-0 transition-all duration-300">
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
