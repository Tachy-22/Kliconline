
import { CalendarCheck, HandHeart, Heart, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

type Benefit = {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
};

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Find Fulfillment and Joy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/hero-img.svg",
    icon: Heart
  },
  {
    id: 2,
    title: "Shared Values",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/hero-img.svg",
    icon: Users
  },
  {
    id: 3,
    title: "Charity Events",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "/hero-img.svg",
    icon: CalendarCheck
  },
  {
    id: 4,
    title: "Community Support",
    description:
      "Connect with a supportive community that encourages growth and positive impact in your life.",
    image: "/hero-img.svg",
    icon: HandHeart
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-[5rem] max-w-7xl mx-auto flex flex-col">
      <p className="text-lg uppercase text-gray-600 text-center">
        WHAT ARE WE ABOUT?
      </p>
      <h2 className="text-2xl md:text-3xl pt-[1rem] md:pt-[2rem] pb-[3rem] md:pb-[5rem] font-bold mx-auto text-gray-800 uppercase max-w-[25rem] text-center">
        The Benefits of Joining Our Church
      </h2>
      <div className="flex flex-col gap-[3rem] md:gap-[6rem]">
        {benefits.map((benefit, id) => (
          <div
            key={benefit.id}
            className={`${
              id % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } flex flex-col items-center gap-4 md:gap-6`}
          >
            <div className="w-full text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                {React.createElement(benefit.icon, {
                  className: "w-8 h-8 text-gray-800"
                })}
                <h3 className="text-2xl md:text-3xl uppercase font-semibold">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
            <div className="w-full">
              <Image
                width={2000}
                height={1000}
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-[15rem] md:h-[20rem] object-cover rounded-lg mb-4"
              />
            </div>
            {/* Social links section removed due to undefined 'member' variable */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
