"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  serviceTimes: string;
  pastorName: string;
  description: string;
  image: string;
  mapEmbedUrl: string;
}

export const BranchesData: Branch[] = [
  {
    id: "uk-main",
    name: "KLIC UK (Headquarters)",
    address:
      "Main hall, Haxby Road Primary Academy. 154 Haxby Road, Clinton, York Y031 8JN",
    phone: "+44 123 456 7890",
    email: "kliconline@gmail.com",
    serviceTimes:
      "Sunday: 10:00 AM - 12:30 PM | Wednesday: 7:00 PM - 9:00 PM | Friday: 6:00 PM - 7:30 PM",
    pastorName: "Pastor Sam and Olaide Adewuyi",
    description:
      "Our main headquarters located in the heart of London, UK. This branch hosts our main Sunday services, midweek Bible studies, and special events. The London branch also houses our School of Ministry and administrative offices.",
    image:
      "https://images.pexels.com/photos/9322688/pexels-photo-9322688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2347.2133349311897!2d-1.0758845234233892!3d53.975551172322174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879316bfa2abe99%3A0x1ae5b90f20bf88fc!2sHaxby%20Road%20Primary%20Academy%2C%20154%20Haxby%20Rd%2C%20York%20YO31%208JN%2C%20UK!5e0!3m2!1sen!2sus!4v1653647296295!5m2!1sen!2sus",
  },
  {
    id: "lagos",
    name: "KLIC Lagos",
    address:
      "KLIC Hall, Quadrant Event Center 6, Alhaji Mudashiru Awe Street, adjacent Yaba Tech's Main Entrance, Yaba, Lagos",
    phone: "+234 8039373989",
    email: "kliconline@gmail.com",
    serviceTimes:
      "Sunday: 8:00 AM - 10:30 AM & 11:00 AM - 1:30 PM | Tuesday: 6:30 PM - 8:30 PM | Friday: 6:00 PM - 8:00 PM",
    pastorName: "Pastor Paul",
    description:
      "Our Lagos branch serves the vibrant city with multiple Sunday services to accommodate our growing congregation. This branch has a strong focus on youth ministry and community outreach programs throughout Lagos.",
    image:
      "https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8299233073325!2d3.3690384148198874!3d6.5226679240620355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0f7e6d6d1d%3A0x36c31d0ca74e016b!2sYaba%20College%20of%20Technology!5e0!3m2!1sen!2sus!4v1653647541676!5m2!1sen!2sus",
  },
  {
    id: "akure",
    name: "KLIC Akure",
    address:
      "39A, Alaba Community Road, stateline,FUT Akure, Ondo State, Nigeria",
    phone: "+(+234) 7017871161",
    email: "kliconline@gmail.com",
    serviceTimes:
      "Sunday: 9:00 AM - 11:30 AM | Wednesday: 6:00 PM - 8:00 PM | Saturday: 5:00 PM - 7:00 PM (Youth Service)",
    pastorName: "Pastor Rotimi and Harriett Ekundayo",
    description:
      "Our Akure branch serves the capital city of Ondo State with powerful worship and in-depth teaching of God's Word. This branch has a special focus on family ministries and rural outreach programs.",
    image:
      "https://images.pexels.com/photos/7697244/pexels-photo-7697244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.903687121235!2d5.148146774907534!3d7.262822792738298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1047966e0c7083c5%3A0x6f290aedde59d11!2sFederal%20University%20of%20Technology%20Akure!5e0!3m2!1sen!2sus!4v1653647583269!5m2!1sen!2sus",
  },
];

const Branches = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white py-20">
            <div className="container py-12 mx-auto px-4 text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Extensions
              </motion.h1>
              <motion.div
                className="w-20 h-1 bg-church-yellow mx-auto mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              ></motion.div>
              <motion.p
                className="text-lg max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Kingdom Life International Church locations around the world,
                bringing the Kingdom message to all nations.
              </motion.p>
            </div>
          </div>

          {/* Main Branches */}
          <section className="py-16">
            <div className="container mx-auto px-4 ">
              <div className="text-center mb-12">
                {/* <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Our
                </h2> */}
                {/* <div className="w-20 h-1 bg-church-purple mx-auto mb-6"></div> */}
                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                  Explore our main branches where you can attend services and be
                  part of our growing community.
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {BranchesData.slice(0, 3).map((branch, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-lg overflow-hidden shadow-lg"
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-church-yellow p-2 rounded-full mr-3">
                          <MapPin className="h-5 w-5 text-gray-800" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold">
                          {branch.name}
                        </h3>
                      </div>

                      <div className="space-y-3 mb-6 text-gray-600">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-church-purple mr-2 flex-shrink-0 mt-0.5" />
                          <p>{branch.address}</p>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-church-purple mr-2 flex-shrink-0" />
                          <p>{branch.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-church-purple mr-2 flex-shrink-0" />
                          <p>{branch.email}</p>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-church-purple mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Service Times:</p>
                            <p>{branch.serviceTimes}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <iframe
                          src={branch.mapEmbedUrl}
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg mb-4"
                          title={`${branch.name} Map`}
                        ></iframe>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Secondary Locations */}
          {/* <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Other Locations
                </h2>
                <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                  Our growing network of churches and prayer centers around the
                  world.
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {BranchesData.slice(3).map((branch, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-serif font-bold mb-2">
                        {branch.name}
                      </h3>
                      <div className="space-y-2 mb-4 text-gray-600 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-church-purple mr-2 flex-shrink-0 mt-0.5" />
                          <p>{branch.address}</p>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-church-purple mr-2 flex-shrink-0" />
                          <p>{branch.serviceTimes.split(" | ")[0]}</p>
                        </div>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 border-church-purple text-church-purple hover:bg-church-purple hover:text-white"
                      >
                        <Link href={`/branches/${branch.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section> */}

          {/* Global Presence */}
          <section className="py-16 bg-church-purple text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <motion.h2
                    className="text-3xl md:text-4xl font-serif font-bold mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Our Global Presence
                  </motion.h2>
                  <motion.div
                    className="w-20 h-1 bg-church-yellow mx-auto mb-6"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <motion.p
                    className="text-lg mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Kingdom Life International Church is expanding globally,
                    with a vision to establish churches in every major city
                    around the world.
                  </motion.p>
                </div>

                <div className="flex flex-wrap justify-center text-center gap-8">
                  <div className="px-6">
                    <div className="text-4xl md:text-6xl font-bold mb-2">3</div>
                    <div className="text-lg text-gray-200">Extensions</div>
                  </div>
                  <div className="px-6">
                    <div className="text-4xl md:text-6xl font-bold mb-2">2</div>
                    <div className="text-lg text-gray-200">Countries</div>
                  </div>
                  <div className="px-6">
                    <div className="text-4xl md:text-6xl font-bold mb-2">
                      5,000+
                    </div>
                    <div className="text-lg text-gray-200">Members</div>
                  </div>
                  <div className="px-6">
                    <div className="text-4xl md:text-6xl font-bold mb-2">
                      100+
                    </div>
                    <div className="text-lg text-gray-200">Evangelists</div>
                  </div>
                </div>

                {/* <div className="mt-12 text-center">
                  <Button className="bg-church-yellow hover:bg-church-yellow-dark text-gray-900 px-8 py-6 text-lg">
                    Join Our Mission
                  </Button>
                </div> */}
              </div>
            </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Branches;
