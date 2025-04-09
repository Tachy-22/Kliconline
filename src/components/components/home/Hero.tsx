"use client"
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("programs");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section h-[40rem] md:min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 py-24 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            We Teach and Preach the Kingdom of God
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Join us as we experience God&apos;s presence, love, and teachings in
            a community of faith and worship.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              onClick={scrollToServices}
              className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900 rounded-full px-8 py-6 text-lg font-medium"
            >
              Join Us in Worship
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <ArrowDown className="h-8 w-8 text-church-yellow" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
