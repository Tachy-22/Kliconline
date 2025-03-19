import React from "react";

const ContactHero = () => {
  return (
    <section
      className="relative h-[30rem] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/contacthero-img.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full mx-auto max-w-7xl gap-4 lg:px-[4.5rem] px-[2rem] ">
        <h2 className="text-sm  uppercase  font-semibold text-[#FFD2A4] tracking-wide">
          CONTACT
        </h2>
        <h1 className="text-4xl font-bold mt-2 uppercase flex flex-col gap-3">
          <span>Get in touch with</span>
          <span className="">our CHURCH</span>
        </h1>
      </div>
    </section>
  );
};

export default ContactHero;
