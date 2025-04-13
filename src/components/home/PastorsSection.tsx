import { Button } from "@/components/ui/button";
import Link from "next/link";

const PastorsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Meet Our SETMAN
          </h2>
          <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            God has blessed our church with dedicated leaders who are passionate
            about teaching God&apos;s Word and ministering to His people.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          <div className="flex-1 max-w-lg lg:max-w-lg">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-church-yellow rounded-tl-lg"></div>
              <img
                src="/setman.png"
                alt="Pastor Sam Adewuyi"
                className="w-full h-full bg-white object-cover rounded-lg shadow-lg relative z-10"
              />
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-church-purple rounded-br-lg"></div>
            </div>
          </div>

          <div className="flex-1 lg:max-w-lg">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Pastor Sam & Olaide Adewuyi
            </h3>
            <div className="w-16 h-1 bg-church-yellow mb-6"></div>
            <p className="text-lg mb-6 text-gray-700">
              Pastor Sam and Olaide Adewuyi are the founders and lead pastors of
              Kingdom Life International Church. With over 20 years in ministry,
              they are committed to teaching the uncompromised Word of God and
              helping people discover their purpose in God&apos;s kingdom.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Their passion for spreading the Kingdom message has led to the
              establishment of multiple KLIC branches across different
              countries, reaching thousands with the Gospel of Jesus Christ.
            </p>
            <Button
              asChild
              className="bg-church-purple hover:bg-church-purple-dark text-white"
            >
              <Link href="/about">Read Full Bio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorsSection;
