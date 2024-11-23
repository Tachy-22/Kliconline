import Blog from "@/components/layouts/Blog";
import React from "react";

const page = ({ params }: { params: Promise<{ blogId: string }> }) => {
  const blogData = {
    title: "Faith in the Bible: A Journey of Trust and Belief",
    author: "Pastor John Smith",
    date: "2024-01-20",
    images: [
      "/images/faith/bible-open.jpg",
      "/images/faith/prayer-hands.jpg",
      "/images/faith/cross-sunset.jpg",
    ],
    content: `<article>
  <p>Faith is the cornerstone of Christian belief, defined beautifully in Hebrews 11:1: "Now faith is confidence in what we hope for and assurance about what we do not see."</p>

  <img src="/sermonhero-img.svg" alt="Open Bible" />

  <h2>The Foundation of Faith</h2>

  <p>Throughout scripture, we witness countless examples of unwavering faith. Abraham's willingness to sacrifice his son Isaac demonstrates the ultimate test of faith. As Romans 4:20-21 tells us:</p>

  <blockquote>"Yet he did not waver through unbelief regarding the promise of God, but was strengthened in his faith and gave glory to God, being fully persuaded that God had power to do what he had promised."</blockquote>

  <p>Our journey of faith often begins with small steps, much like a mustard seed. Jesus himself said:</p>

  <blockquote>"If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you." - Matthew 17:20</blockquote>

  <img src="/sermon-img.svg" alt="Praying Hands" />

  <h2>Living Out Our Faith</h2>

  <p>Faith isn't merely believing - it's acting on that belief. James 2:17 reminds us that "faith by itself, if it is not accompanied by action, is dead." This truth challenges us to live out our faith daily through:</p>

  <ul>
    <li>Prayer and meditation</li>
    <li>Study of Scripture</li>
    <li>Fellowship with believers</li>
    <li>Service to others</li>
  </ul>

  <h2>Overcoming Doubts Through Faith</h2>

  <p>Even the strongest believers face moments of doubt. The father in Mark 9:24 speaks to all of us when he cries out, "I do believe; help me overcome my unbelief!"</p>

  <img src="/hero-img.svg" alt="Cross at Sunset" />

  <h2>The Reward of Faith</h2>

  <p>The Bible promises that faith brings both present peace and eternal rewards. As Paul writes in 2 Timothy 4:7-8:</p>

  <blockquote>"I have fought the good fight, I have finished the race, I have kept the faith. Now there is in store for me the crown of righteousness."</blockquote>

  <p>Remember, faith is not the absence of doubt but the presence of trust. In our modern world, maintaining strong faith requires intentional dedication to spiritual growth and a willingness to trust God even when we don't understand His ways.</p>

  <h3>A Prayer for Strengthening Faith</h3>

  <p>Lord, strengthen our faith as we journey through life. Help us to trust in Your promises and to remember that You are faithful, even when our faith wavers. Guide us in living out our faith in ways that draw others to Your light. Amen.</p>
</article>`,
    slug: "faith-in-the-bible",
    category: "RELATIONSHIP",
  };

  console.log({ params });

  return <Blog blogData={blogData} />;
};

export default page;
