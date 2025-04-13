import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-church-purple">
              About Kingdom Life International Church
            </h2>
            <div className="w-20 h-1 bg-church-yellow mb-6"></div>
            <p className="text-lg mb-6 text-gray-700">
              We are commissioned and anointed of God to teach and preach the
              kingdom of God. Our mission is to spread the Gospel of Jesus
              Christ, nurture spiritual growth, and build a community of
              believers who live Kingdom principles.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              At Kingdom Life International Church, we are dedicated to creating
              a welcoming environment where everyone can experience the love of
              God, grow in their faith, and be equipped to impact their world.
            </p>
            <Button
              asChild
              className="bg-church-purple hover:bg-church-purple-dark text-white"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-32 h-32 bg-church-yellow rounded-tl-lg"></div>
              <img
                src="/klic-home-2.jpg"
                alt="Church congregation"
                className="w-full h-full  object-cover rounded-lg shadow-lg relative z-10"
              />
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-church-purple rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
