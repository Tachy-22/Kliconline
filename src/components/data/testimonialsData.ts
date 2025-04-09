
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  category: "healing" | "financial" | "family" | "spiritual" | "other";
}

export const TestimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Church Member",
    quote: "Kingdom Life International Church has completely transformed my spiritual journey. The teachings on the Kingdom of God have given me a new perspective on my relationship with Christ. After attending for just six months, I experienced healing from a long-term illness that doctors couldn't resolve.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    category: "healing"
  },
  {
    id: 2,
    name: "Michael Thompson",
    role: "Youth Leader",
    quote: "Being part of KLIC has been a life-changing experience. The community is so welcoming, and the depth of biblical teaching has helped me grow in ways I never imagined. After suffering from chronic migraines for years, I received prayer during a service, and I've been completely healed. God's power is truly manifested in this church!",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    category: "healing"
  },
  {
    id: 3,
    name: "Rachel Williams",
    role: "Choir Member",
    quote: "I've been attending KLIC for over 5 years now, and I can truly say that the worship experience and biblical teachings are exceptional. Pastor Sam's messages are always relevant and challenging. After applying the financial principles taught in the church, my business has thrived, and I've been able to clear all my debts within a year!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "financial"
  },
  {
    id: 4,
    name: "David Okonkwo",
    role: "Business Owner",
    quote: "I was on the verge of bankruptcy when I first visited KLIC. The teachings on biblical financial principles completely changed my approach to business. Following Pastor Sam's advice, I made some strategic changes, and within six months, my business had not only recovered but was thriving beyond my expectations. God's wisdom really works!",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    category: "financial"
  },
  {
    id: 5,
    name: "Jennifer and Paul Roberts",
    role: "Married Couple",
    quote: "Our marriage was falling apart, and divorce seemed inevitable. As a last resort, we attended a marriage retreat organized by KLIC. The biblical principles and counseling we received saved our relationship. Three years later, we have a thriving marriage and are now mentoring other couples facing similar challenges. God truly restores!",
    image: "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    category: "family"
  },
  {
    id: 6,
    name: "Grace Adebayo",
    role: "Single Mother",
    quote: "As a single mother of three, I struggled with guilt and felt like I had failed my children. The Hebrew Women Fellowship at KLIC embraced me, mentored me, and helped me understand my worth in God's eyes. Today, my children are thriving, and I've found purpose in helping other single mothers navigate their journeys. God's restoration is real!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "family"
  },
  {
    id: 7,
    name: "Thomas Wilson",
    role: "Former Atheist",
    quote: "I came to KLIC as a skeptic, accompanying a friend who had invited me multiple times. The logical presentation of the Gospel and the genuine love I experienced broke down my intellectual barriers against Christianity. After months of questioning and searching, I gave my life to Christ and have found the purpose and peace I had been seeking all along.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    category: "spiritual"
  },
  {
    id: 8,
    name: "Anna Chen",
    role: "International Student",
    quote: "Moving from China to study in the UK was overwhelming, and I felt very alone. Finding KLIC was like discovering a family away from home. The international community here welcomed me, and through the clear Bible teaching, I've grown in my understanding of God. This church has been my anchor in a foreign land.",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    category: "spiritual"
  },
  {
    id: 9,
    name: "Emmanuel Okafor",
    role: "Youth Mentor",
    quote: "I was addicted to drugs and involved in gang activity when a friend invited me to KLIC's youth program. The mentoring and discipleship I received completely transformed my life. Now, five years later, I'm drug-free, have completed my education, and am mentoring young people facing the same challenges I once did. God's redemption is powerful!",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    category: "other"
  }
];
