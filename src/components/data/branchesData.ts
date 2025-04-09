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
  // {
  //   id: "manchester",
  //   name: "KLIC Manchester",
  //   address: "34 Kingdom Avenue, Manchester, UK M1 1AB",
  //   phone: "+44 161 234 5678",
  //   email: "manchester@klicuk.org",
  //   serviceTimes: "Sunday: 10:30 AM - 12:30 PM | Thursday: 7:00 PM - 8:30 PM",
  //   pastorName: "Pastor Michael and Sarah Johnson",
  //   description:
  //     "Serving the Manchester area with vibrant worship and strong teaching. This branch has a growing children's ministry and community outreach programs.",
  //   image:
  //     "https://images.unsplash.com/photo-1518987048-93e29699e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   mapEmbedUrl:
  //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.343638427194!2d-2.2415941843857733!3d53.48137337337845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1c265158e3d%3A0x3c2815c483831b76!2sManchester%2C%20UK!5e0!3m2!1sen!2sus!4v1653647616401!5m2!1sen!2sus",
  // },
  // {
  //   id: "birmingham",
  //   name: "KLIC Birmingham",
  //   address: "56 Gospel Lane, Birmingham, UK B5 5TH",
  //   phone: "+44 121 345 6789",
  //   email: "birmingham@klicuk.org",
  //   serviceTimes: "Sunday: 11:00 AM - 1:00 PM | Tuesday: 7:00 PM - 8:30 PM",
  //   pastorName: "Pastor Thomas and Grace Wilson",
  //   description:
  //     "Our Birmingham branch serves a diverse multicultural community with services that blend traditional and contemporary worship styles.",
  //   image:
  //     "https://images.unsplash.com/photo-1626112850157-00531a7a8c3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   mapEmbedUrl:
  //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.3716351606253!2d-1.8917308843322589!3d52.47968967980791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc8e4a2a9361%3A0xab7be427403e81e0!2sBirmingham%2C%20UK!5e0!3m2!1sen!2sus!4v1653647638498!5m2!1sen!2sus",
  // },
  // {
  //   id: "accra",
  //   name: "KLIC Accra",
  //   address: "12 Liberation Road, Accra, Ghana",
  //   phone: "+233 24 123 4567",
  //   email: "accra@klicinternational.org",
  //   serviceTimes: "Sunday: 9:00 AM - 11:30 AM | Friday: 6:00 PM - 8:00 PM",
  //   pastorName: "Pastor Benjamin and Joy Agyei",
  //   description:
  //     "Our Accra branch brings the Kingdom message to Ghana's capital with a focus on professional development and discipleship.",
  //   image:
  //     "https://images.unsplash.com/photo-1576397767434-b86bedb9be9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  //   mapEmbedUrl:
  //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5525140704344!2d-0.2064517149205664!3d5.604255095925708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1653647670451!5m2!1sen!2sus",
  // },
  // {
  //   id: "nairobi",
  //   name: "KLIC Nairobi",
  //   address: "78 Uhuru Gardens Road, Nairobi, Kenya",
  //   phone: "+254 712 345 678",
  //   email: "nairobi@klicinternational.org",
  //   serviceTimes: "Sunday: 8:30 AM - 11:00 AM | Wednesday: 6:00 PM - 7:30 PM",
  //   pastorName: "Pastor Daniel and Faith Mwangi",
  //   description:
  //     "Our Nairobi branch serves Kenya's capital with dynamic worship and strong biblical teaching, with a special focus on training next-generation leaders.",
  //   image:
  //     "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80",
  //   mapEmbedUrl:
  //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817392870187!2d36.81625641490483!3d-1.2924868359812414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11655c311541%3A0x9dd769ac553a88a8!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1653647694547!5m2!1sen!2sus",
  // },
  // {
  //   id: "johannesburg",
  //   name: "KLIC Johannesburg",
  //   address: "45 Mandela Street, Johannesburg, South Africa",
  //   phone: "+27 82 123 4567",
  //   email: "joburg@klicinternational.org",
  //   serviceTimes: "Sunday: 9:30 AM - 12:00 PM | Thursday: 7:00 PM - 8:30 PM",
  //   pastorName: "Pastor Samuel and Rachel Mbeki",
  //   description:
  //     "Our Johannesburg branch serves South Africa with powerful worship experiences and practical biblical teaching for everyday living.",
  //   image:
  //     "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  //   mapEmbedUrl:
  //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.316698868106!2d28.0444433149074!3d-26.27865838339598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1653647719531!5m2!1sen!2sus",
  // },
];
