"use client";

import React from "react";
import ContactHero from "../ui/ContactHero";
import ContactForm from "../ui/ContactForm";

const Contact = () => {
  return (
    <div className="flex flex-col">
      <ContactHero />
      <ContactForm />
    </div>
  );
};

export default Contact;
