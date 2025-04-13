"use client"
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

interface ProgramCardProps {
  title: string;
  day: string;
  time: string;
  location: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const ProgramCard = ({
  title,
  day,
  time,
  location,
  icon,
  color,
  index,
}: ProgramCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <div
        className={`h-full rounded-xl overflow-hidden shadow-lg bg-white border-t-4 ${color} hover:shadow-xl transition-all duration-300`}
      >
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <div
              className={`p-3 rounded-full ${color.replace(
                "border-t-",
                "bg-"
              )}/10`}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Join us and be blessed
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-4 w-4 mr-3 text-church-purple" />
              <span>{day}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-3 text-church-purple" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-4 w-4 mr-3 text-church-purple" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProgramsSection = () => {
  const programs = [
    {
      title: "Online Service",
      day: "Every Sunday",
      time: "10:00 AM BST",
      location: "Online",
      icon: <Users className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-yellow",
    },
    {
      title: "Interdenominational Bible Study (Nigeria)",
      day: "Every Thursday",
      time: "5:30 PM - 7:30 PM",
      location: "Church Auditorium",
      icon: <Calendar className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-purple",
    },
    {
      title: "Sunday Service (Nigeria)",
      day: "Every Sunday",
      time: "9:00 AM ",
      location: "Online",
      icon: <Users className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-yellow",
    },
    {
      title: "6 Hours Prayer (Nigeria)",
      day: "Third Saturday Monthly",
      time: "6:30 AM - 12:30 PM",
      location: "Church Auditorium",
      icon: <Calendar className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-yellow-light",
    },
    {
      title: "School of Ministry",
      day: "First Saturday Monthly",
      time: "9:00 AM - 1:00 PM",
      location: "Online",
      icon: <Calendar className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-purple-dark",
    },
    {
      title: "Hebrew Women Fellowship",
      day: "Fourth Saturday Monthly",
      time: "4:00 PM - 6:00 PM",
      location: "Church Auditorium",
      icon: <Users className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-purple-light",
    },
    {
      title: "KLIC Prays",
      day: "Every Sunday",
      time: "4:00 PM - 6:00 PM",
      location: "Church Auditorium",
      icon: <Users className="h-5 w-5 text-church-purple" />,
      color: "border-t-church-yellow",
    },
  ];

  return (
    <section
      id="programs"
      className="py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Our Programs
          </h2>
          <motion.div
            className="w-20 h-1 bg-church-yellow mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            Join us for our weekly services and special events designed to help
            you grow in your faith and connect with our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              index={index}
              title={program.title}
              day={program.day}
              time={program.time}
              location={program.location}
              icon={program.icon}
              color={program.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
