"use client";
import Navbar from "@/components/components/layout/Navbar";
import Footer from "@/components/components/layout/Footer";
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
                  to expanding God&apos;s Kingdom, touching lives with His love, and
                  establishing His righteousness in every sphere of society.
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
                  src="https://images.unsplash.com/photo-1507692812060-98338d07aca3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="md:w-1/3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-church-purple/20"></div>
                    <img
                      src="https://images.unsplash.com/photo-1564932438201-7efcee79985b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                      alt="Pastor Sam Adewuyi"
                      className="w-full h-auto rounded-lg relative z-10"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    Pastor Sam Adewuyi
                  </h3>
                  <div className="w-16 h-1 bg-church-yellow mb-6"></div>
                  <p className="text-gray-700 mb-4">
                    Pastor Sam Adewuyi is the SETMAN of
                    Kingdom Life International Church. With over 25 years in
                    ministry, he is known for his profound insights into God&apos;s
                    Word and his unique ability to communicate Kingdom
                    principles in a simple, practical way that transforms lives.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Ordained by God with an apostolic mandate, Pastor Sam has
                    ministered across different continents, establishing
                    churches and raising leaders who are impacting their
                    communities with the Gospel.
                  </p>
                  <p className="text-gray-700">
                    He is married to Pastor Olaide Adewuyi, and together they
                    oversee the KLIC network of churches, the School of
                    Ministry, and various outreach programs designed to expand
                    God&apos;s Kingdom on earth.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-10 items-center mt-16">
                <div className="md:w-1/3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-church-purple/20"></div>
                    <img
                      src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
                      alt="Pastor Olaide Adewuyi"
                      className="w-full h-auto rounded-lg relative z-10"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    Pastor Olaide Adewuyi
                  </h3>
                  <div className="w-16 h-1 bg-church-yellow mb-6"></div>
                  <p className="text-gray-700 mb-4">
                    Pastor Olaide Adewuyi serves alongside her husband as
                    co-pastor of Kingdom Life International Church. She is a
                    dynamic teacher and preacher whose ministry has touched
                    thousands of lives around the world.
                  </p>
                  <p className="text-gray-700 mb-4">
                    With a specific calling to minister to women, Pastor Olaide
                    is the founder of the Hebrew Women Fellowship, a ministry
                    that empowers women to embrace their divine identity and
                    fulfill their God-given purpose.
                  </p>
                  <p className="text-gray-700">
                    Her passion for prayer, worship, and the Word of God has
                    made her a source of inspiration and strength to many, and
                    her teachings continue to bring healing, deliverance, and
                    transformation to all who hear them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        {/* <section className="py-20 bg-church-purple text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Support Our Vision
              </h2>
              <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
              <p className="text-lg mb-8 opacity-90">
                Your generous support enables us to continue spreading the
                message of the Kingdom of God around the world. Together, we can
                make a lasting impact on lives, communities, and nations.
              </p>
              <Button
                asChild
                className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900 px-8 py-6 text-lg"
              >
                <Link href="/donate">Make a Donation</Link>
              </Button>
            </div>
          </div>
        </section> */}
        <Donate/>
      </main>

      <Footer />
    </div>
  );
};

export default About;
