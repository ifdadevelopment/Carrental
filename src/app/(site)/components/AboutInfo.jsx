"use client";

import React, { useState } from "react";
import Image from "next/image";

const TABS = [
  {
    key: "about",
    label: "About Us",
    title: "Who We Are",
    content:
      "GS Refrigeration Enterprises (GSRE) is a closely held HVACR company established by Mr. Deepak Kumar in 2017. We provide reliable and complete air conditioning and refrigeration solutions across all market segments. GSRE is technically and commercially equipped to design even the most complex HVACR systems in the most economical and effective manner, tailored precisely to customer requirements, ensuring long-term performance and satisfaction.",
  },
  {
    key: "vision",
    label: "Our Vision",
    title: "Our Vision",
    content:
      "Our vision is to remain at the edge of delivering ‘better to best’ HVACR services by supporting the growing demand of the air conditioning industry with innovative designs, energy-efficient systems, and dependable service support, while building long-term trust with our clients.",
  },
  {
    key: "mission",
    label: "Our Mission",
    title: "Our Mission",
    content:
      "Our mission is to deliver excellent HVACR products backed by prompt, efficient, and high-quality service support. We strive to design and execute air conditioning and refrigeration systems that achieve optimal performance at the most competitive cost, ensuring complete customer satisfaction through technical excellence and timely execution.",
  },
];

const AboutInfo = () => {
  const [activeTab, setActiveTab] = useState("about");
  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 ">
      
      {/* HEADING */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          Sunbury Rentals <span className="global-color">Drive your dreams</span>
        </h1>
        <p className="text-lg sm:text-md text-gray-600 max-w-2xl mx-auto">
          Affordable Car Rentals & Luxury Chauffeur Service.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* LEFT IMAGE */}
        <div className="relative w-full h-[260px] md:h-[380px] rounded-lg overflow-hidden">
          <Image
            src="/images/audi-q7.jpg"
            alt="Sunbury Rentals"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* TABS */}
          <div className="flex gap-6 mb-6 ">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 text-sm sm:text-base md:text-2xl font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-current global-color"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              {currentTab.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {currentTab.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
