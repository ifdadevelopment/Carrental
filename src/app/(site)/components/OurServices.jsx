"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { services } from "../data/fleetData";

const TABS = ["hire", "rent"];

export default function OurServices() {
  const [activeTab, setActiveTab] = useState("hire");
  const sliderRef = useRef(null);

  // Infinite list
  const infiniteItems = [...services, ...services, ...services];

  // Reset slider cleanly on tab change
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    requestAnimationFrame(() => {
      slider.scrollLeft = slider.scrollWidth / 3;
    });
  }, [activeTab]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const sectionWidth = slider.scrollWidth / 3;

    if (slider.scrollLeft < sectionWidth * 0.5) {
      slider.scrollLeft += sectionWidth;
    } else if (slider.scrollLeft > sectionWidth * 1.5) {
      slider.scrollLeft -= sectionWidth;
    }
  };

  const slide = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector("[data-card]");
    const cardWidth = card?.offsetWidth || 300;

    slider.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="global-color font-semibold tracking-wide uppercase mb-2">
            Our Services
          </p>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Premium Chauffeur Services in Melbourne
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
            Experience seamless airport transfers, corporate travel, and luxury
            chauffeur services backed by premium vehicles and professionally
            trained drivers.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 border
                ${
                  activeTab === tab
                    ? "global-bg text-white global-border shadow-md"
                    : "border-gray-300 text-gray-700 hover:global-bg hover:text-white"
                }`}
            >
              {tab === "hire" ? "Car Hire" : "Car Rental"}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => slide("left")}
            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 global-bg text-white w-10 h-10 rounded-full items-center justify-center z-10 shadow-md"
            aria-label="Previous"
          >
            ‹
          </button>

          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="
              flex gap-6
              overflow-x-auto
              scroll-smooth
              scrollbar-hide
              snap-x snap-mandatory
              pb-4
            "
          >
            {infiniteItems.map((item, idx) => (
              <ServiceCard
                key={`${activeTab}-${item.title}-${idx}`}
                item={item}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => slide("right")}
            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 global-bg text-white w-10 h-10 rounded-full items-center justify-center z-10 shadow-md"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function ServiceCard({ item }) {
  return (
    <div
      data-card
      className="
        snap-start
        shrink-0
        w-[90%]
        sm:w-[48%]
        lg:w-[23%]
        bg-white
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="relative w-full h-[220px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="global-bg text-white p-6 -mt-6 mx-4 relative clip-card">
        <h3 className="text-lg font-bold mb-2 text-center">
          {item.title}
        </h3>
        <p className="text-sm text-center opacity-90">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
