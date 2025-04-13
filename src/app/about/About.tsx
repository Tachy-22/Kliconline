"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle } from "lucide-react";
import Donate from "./Donate";

const About = () => {
  const onions = [
    {
      title: "Global Missions & Evangelism",
      description:
        "We are passionate about spreading the Gospel and establishing the Kingdom of God throughout the world.",
    },
    {
      title: "Prayer",
      description:
        "We are committed to creating an atmosphere of prayer to connect with God and see His will done on earth.",
    },
    {
      title: "Ministry of the Word",
      description:
        "We believe in teaching the uncompromised Word of God as the foundation for all aspects of life.",
    },
    {
      title: "Ministry of the Holy Spirit",
      description:
        "We embrace the supernatural power and gifts of the Holy Spirit in our daily lives and church ministry.",
    },
    {
      title: "Worship",
      description:
        "We value heartfelt worship that honors God and creates an atmosphere for His presence.",
    },
    {
      title: "Love-walk",
      description:
        "We strive to demonstrate Christ&apos;s love through our actions, relationships, and service to others.",
    },
    {
      title: "Excellence",
      description:
        "We pursue excellence in all we do as a reflection of our commitment to glorify God.",
    },
    {
      title: "Mentoring and Discipleship",
      description:
        "We are dedicated to raising disciples who understand and live according to Kingdom principles.",
    },
    {
      title: "Influence and Leadership",
      description:
        "We develop Kingdom-minded leaders who positively impact every sphere of society.",
    },
    {
      title: "Prosperity and Wealth Creation",
      description:
        "We believe in biblical prosperity that enables us to be a blessing and advance God&apos;s Kingdom.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-church-purple text-white">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                About Kingdom Life International Church
              </h1>
              <div className="w-20 h-1 bg-church-yellow mb-6"></div>
              <p className="text-xl opacity-90">
                Discover our story, mission, and vision to spread the Kingdom of
                God around the world.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-64 bg-church-yellow opacity-20 rounded-tl-full" />
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Our Vision
                </h2>
                <div className="w-16 h-1 bg-church-yellow mb-6"></div>
                <p className="text-lg text-gray-700 mb-6">
                  Our vision at Kingdom Life International Church is to
                  establish the Kingdom of God in the hearts of people and
                  create a global community of believers who understand and live
                  according to Kingdom principles.
                </p>
                <p className="text-lg text-gray-700">
                  We aim to raise disciples who will impact their world with the
                  message of the Kingdom and the power of the Holy Spirit,
                  transforming lives, communities, and nations for God&apos;s
                  glory.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Our Mission
                </h2>
                <div className="w-16 h-1 bg-church-yellow mb-6"></div>
                <p className="text-lg text-gray-700 mb-6">
                  We are commissioned and anointed of God to teach and preach
                  the Kingdom of God, empowering believers to live victoriously
                  and fulfill their God-given purpose.
                </p>
                <p className="text-lg text-gray-700">
                  Through discipleship, training, and outreach, we are committed
                  to expanding God&apos;s Kingdom, touching lives with His love,
                  and establishing His righteousness in every sphere of society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Onions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Our Onions
              </h2>
              <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
              <p className="text-lg max-w-2xl mx-auto text-gray-700">
                These are the foundational principles that guide everything we
                do at Kingdom Life International Church.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {onions.map((value, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-church-purple" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Our History
                </h2>
                <div className="w-16 h-1 bg-church-yellow mb-6"></div>
                <p className="text-lg text-gray-700 mb-4">
                  Kingdom Life International Church was founded in 2005 by
                  Pastor Sam and Olaide Adewuyi, who received a divine mandate
                  to establish a ministry focused on teaching Kingdom principles
                  and raising disciples.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Starting with just a small group of believers meeting in their
                  home, KLIC has grown to become a global ministry with branches
                  in the UK, Nigeria, and other parts of the world.
                </p>
                <p className="text-lg text-gray-700">
                  Over the years, God has used KLIC to transform countless lives
                  through powerful teaching, miraculous healings, and community
                  outreach programs that demonstrate the love and power of God.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 -top-4 w-32 h-32 bg-church-yellow rounded-tl-lg"></div>
                <img
                  src="/testimony-hero.jpg"
                  alt="Church history"
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg relative z-10"
                />
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-church-purple rounded-br-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Pastor Bio */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Our SETMAN
              </h2>
              <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
            </div>

            <div className="max-w- mx-auto">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-church-purple/20"></div>
                    <img
                      src="/setman.png"
                      alt="Pastor (Dr.) Sam & Olaide ADEWUYI"
                      className="w-full h-auto rounded-lg relative z-10"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    Pastor (Dr.) Sam & Olaide ADEWUYI
                  </h3>
                  <div className="w-16 h-1 bg-church-yellow mb-6"></div>
                  <p className="text-gray-700 mb-4">
                    Pastor (Dr.) Sam & Olaide ADEWUYI are the SETMAN, Kingdom Life
                    International Church, a rapidly growing movement, headquartered in
                    Akure, Nigeria, with an extension in the city of York, United Kingdom.
                  </p>
                  <p className="text-gray-700 mb-4">
                    They teach the message of Christ Jesus with clarity and simplicity by
                    the inspiration of the Holy Spirit, shedding light on how believers
                    can engage the works of faith to produce results in the secular
                    space, ultimately making them a relevant and positive force, as
                    well as a blessing on the earth.
                  </p>
                  <p className="text-gray-700">
                    They are resident in the United Kingdom and their beautiful union is
                    blessed with amazing children.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
              
        <Donate />
      </main>

      <Footer />
    </div>
  );
};

export default About;
