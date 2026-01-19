'use client';

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  { id: 1, img: "/banners/car1.jpg", alt: "Car 1", title: "Rent Your Dream Car", subtitle: "Luxury and comfort combined" },
  { id: 2, img: "/banners/car2.jpg", alt: "Car 2", title: "Drive in Comfort", subtitle: "Feel the road like never before" },
  { id: 3, img: "/banners/car3.jpg", alt: "Car 3", title: "Affordable Luxury Rentals", subtitle: "Rent a car at unbeatable prices" },
];

const SliderBanner = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
      {/* Image Slide */}
      <img
        src={slides[index].img}
        alt={slides[index].alt}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 flex items-end justify-start text-left px-6 py-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {slides[index].title}
          </h2>
          <p className="text-sm md:text-lg text-gray-200 max-w-lg">
            {slides[index].subtitle}
          </p>
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SliderBanner;
