"use client";

import React from "react";

const MissionAndVision: React.FC = () => {
  return (
    <section className="py-[2rem] md:py-[4rem] max-w-7xl mx-auto">
      <div className="mx-auto p-3 md:px-[4.5rem]">
        <div className="flex lg:flex-row flex-col gap-[3rem]">
          {/* Mission & Vision Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Our Mission & Vision
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Advancing God&apos;s Kingdom
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              At Kingdom Life International Church, our mission is to spread the
              gospel of Jesus Christ, making disciples of all nations. We
              envision a church that transforms lives through the power of
              God&apos;s Word, raising Spirit-filled believers who impact their
              communities and nations for Christ. Our vision is to be a light in
              Nigeria and beyond, bringing hope, healing, and restoration
              through Christ&apos;s love.
            </p>
          </div>

          {/* What We Do Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              What We Do
            </h3>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Building Lives, Restoring Hope
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              We are committed to spiritual growth through dynamic worship,
              sound biblical teaching, and impactful community outreach. Our
              ministries include vibrant worship services, discipleship
              programs, youth empowerment, marriage and family counseling, and
              humanitarian services. Through these initiatives, we&apos;re
              helping people discover their purpose in Christ and live
              fulfilling lives that glorify God.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
