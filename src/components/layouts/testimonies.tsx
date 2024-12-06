"use client";
import React from "react";
import TestimonyCard from "../ui/TestimonyCard";
import { TestmonyModal } from "../modals/TestmonyModal";
import TestimonyHero from "../ui/TestimonyHero";
import TestimonyForm from "../forms/TestimonyForm";

const Testimonies = ({ testimonies }: { testimonies: TestimonyT[] }) => {
  return (
    <>
      <TestimonyHero />
      <div className="flex flex-col py-[2rem] w-full bg-[#F5F2F0]">
        <div className="h-full px-3 lg:px-6 lg::px-20 max-w-7xl w-full mx-auto flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <TestmonyModal>
              <TestimonyForm />
            </TestmonyModal>
          </div>
        </div>

        <div className="py-[6rem] max-w-7xl mx-auto w-full px-3 lg:px-6">
          <div className="grid grid-cols-1 w-full gap-8">
            {testimonies.map((testimony) => (
              <TestimonyCard key={testimony.id} testimony={testimony} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonies;
