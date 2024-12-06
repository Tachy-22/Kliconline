
import React from "react";

const BranchHero: React.FC = () => {
  return (
    <section
      className="relative h-[26rem] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/sermonhero-img.svg')" }}
    >
      <div className="relative z-10 flex flex-col items-start justify-center h-full mx-auto max-w-7xl lg:px-[4.5rem] px-[2rem] text-black">
        <h2 className="text-sm uppercase tracking-wide font-semibold">
          Branches
        </h2>
        <h1 className="text-4xl font-bold mt-2 uppercase">
          Find Your Nearest Branch
        </h1>
      </div>
    </section>
  );
};

export default BranchHero;