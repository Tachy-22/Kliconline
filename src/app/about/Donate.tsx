"use client";
import { motion } from "framer-motion";
import { BanknoteIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Donate = () => {
  return (
    <div className="">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          {/* <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Support Our Ministry
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
                Your generosity helps us continue teaching and preaching the
                Kingdom of God throughout the world.
              </motion.p>
            </div>
          </div> */}

          {/* Donation Options Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 ">
                    Giving Details{" "}
                  </h2>
                  <div className="w-20 h-1 bg-church-purple mx-auto mb-6"></div>
                  {/* <p className="text-lg max-w-2xl mx-auto text-gray-700">
                    Choose a giving option that works best for you. Your support
                    enables us to reach more people with the Kingdom message.
                  </p> */}
                </div>

                <Tabs defaultValue="online" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="online" className="py-3">
                      KLIC Tithe{" "}
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="py-3">
                      KLIC Offerings{" "}
                    </TabsTrigger>
                    <TabsTrigger value="partner" className="py-3">
                      Sam Excelson Teaching Ministry{" "}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="online" className="mt-6">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-church-yellow p-3 rounded-full mr-4">
                          <BanknoteIcon className="h-6 w-6 text-gray-900" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold">
                          KLIC Tithe{" "}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-6">
                        Transfer your donation directly to our church bank
                        account. Please include your name and details.
                      </p>

                      <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Account Name
                            </p>
                            <p className="font-medium">KLIC Tithe</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bank</p>
                            <p className="font-medium">Guaranty Trust Bank</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Account Number
                            </p>
                            <p className="font-medium">0702519692</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold mb-2 text-blue-800">
                          Important Note
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Please include your name and purpose of donation
                          (e.g., &quot;John Smith - Tithe&quot;) in the
                          reference field of your bank transfer to help us
                          properly allocate your donation.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="mt-6">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-church-yellow p-3 rounded-full mr-4">
                          <BanknoteIcon className="h-6 w-6 text-gray-900" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold">
                          KLIC Offering{" "}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-6">
                        Transfer your donation directly to our church bank
                        account. Please include your name and details.
                      </p>

                      <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Account Name
                            </p>
                            <p className="font-medium">KLIC Offering</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bank</p>
                            <p className="font-medium">Guaranty Trust Bank</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Account Number
                            </p>
                            <p className="font-medium">0702519104</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold mb-2 text-blue-800">
                          Important Note
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Please include your name and purpose of donation
                          (e.g., &quot;John Smith - Tithe&quot;) in the
                          reference field of your bank transfer to help us
                          properly allocate your donation.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="partner" className="mt-6">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-church-yellow p-3 rounded-full mr-4">
                          <BanknoteIcon className="h-6 w-6 text-gray-900" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold">
                          Sam Excelson Teaching Ministry{" "}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-6">
                        Transfer your donation directly to our church bank
                        account. Please include your name and details.
                      </p>

                      <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Account Name
                            </p>
                            <p className="font-medium">
                              {" "}
                              Sam Excelson Teaching Ministry{" "}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bank</p>
                            <p className="font-medium">Guaranty Trust Bank</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Account Number
                            </p>
                            <p className="font-medium">0678416263</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold mb-2 text-blue-800">
                          Important Note
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Please include your name and purpose of donation
                          (e.g., &quot;John Smith - Tithe&quot;) in the
                          reference field of your bank transfer to help us
                          properly allocate your donation.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Giving Impact */}
          {/* <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Your Giving Makes a Difference
                </h2>
                <div className="w-20 h-1 bg-church-yellow mx-auto mb-6"></div>
                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                  See how your donations are helping us fulfill our mission and
                  impact lives around the world.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                      alt="Local Outreach"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    Local Outreach
                  </h3>
                  <p className="text-gray-600">
                    Your giving helps us reach our local community through food
                    banks, educational programs, and community events.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1527521888284-f6e501a30b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                      alt="Global Missions"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    Global Missions
                  </h3>
                  <p className="text-gray-600">
                    We support missionaries and church plants in Africa, Asia,
                    and South America, bringing the Kingdom message to unreached
                    people.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1496317899792-9d7dbcd8cb1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                      alt="Ministry Growth"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">
                    Ministry Growth
                  </h3>
                  <p className="text-gray-600">
                    Your support helps us expand our ministry through new
                    branches, online outreach, and training programs for future
                    leaders.
                  </p>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <Button
                  className="bg-church-purple hover:bg-church-purple-dark text-white"
                  asChild
                >
                  <a href="#" className="inline-flex items-center">
                    Read Our Annual Impact Report{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section> */}

          {/* FAQ Section */}
          {/* <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="w-20 h-1 bg-church-purple mx-auto mb-6"></div>
                  <p className="text-lg max-w-2xl mx-auto text-gray-700">
                    Find answers to common questions about giving to Kingdom
                    Life International Church.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">
                      Is my donation tax-deductible?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Yes, Kingdom Life International Church is a registered
                      charity. All donations are tax-deductible as allowed by
                      law. You will receive an annual giving statement for your
                      tax records.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">
                      How secure is online giving?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Our online giving platform uses industry-standard
                      encryption and security protocols to ensure that your
                      personal and financial information is protected. We do not
                      store your card details on our servers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">
                      Can I set up recurring donations?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Yes, you can set up recurring donations on a weekly,
                      bi-weekly, or monthly basis through our online giving
                      platform. You can also modify or cancel your recurring
                      donations at any time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">
                      How is my donation used?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Your donations support our church operations, ministry
                      programs, community outreach, missions, and building
                      maintenance. We are committed to financial transparency
                      and publish annual financial reports.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-medium">
                      Can I donate to a specific fund or project?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Yes, you can designate your donation for a specific fund
                      or project such as missions, building fund, or benevolence
                      fund. Simply select the appropriate fund when making your
                      donation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg flex items-start">
                  <HelpCircle className="text-church-purple h-8 w-8 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold mb-1">
                      Still have questions?
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Contact our finance team for more information about
                      donations, tax receipts, or any other giving-related
                      questions.
                    </p>
                    <Button
                      variant="outline"
                      className="border-church-purple text-church-purple hover:bg-church-purple hover:text-white"
                    >
                      Contact Finance Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </motion.div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Donate;
