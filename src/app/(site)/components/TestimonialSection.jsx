"use client";

import Image from "next/image";
import { testimonials } from "../data/fleetData";


const StarRating = ({ rating }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
            <span
                key={i}
                className={`text-sm ${i < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
            >
                ★
            </span>
        ))}
    </div>
);

const TestimonialCard = ({ item }) => (
    <div className="w-[280px] sm:w-[320px] bg-white rounded-2xl p-6 shadow-sm flex flex-col mx-3">
        <StarRating rating={item.rating} />

        <h3 className="text-lg font-semibold text-gray-900 mt-3">
            {item.heading}
        </h3>

        <p className="text-gray-600 mt-2 flex-grow text-sm">
            {item.review}
        </p>

        <div className="flex items-center gap-3 mt-6">
            {/* <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
            /> */}
            <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
            </div>
        </div>
    </div>
);

const TestimonialSection = () => {
    return (
        <section className="py-16 max-w-6xl mx-auto px-4  overflow-hidden">
            <div className="max-w-6xl mx-auto px-2 md:px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                        What Our Drivers Say
                    </h2>
                    <p className="text-gray-600 text-sm md:text-md mt-2">
                        Real feedback from locals who rent with Sunbury Rentals for rideshare, work and everyday life.          </p>
                </div>
            </div>
            <div className="relative w-full py-2 px-3 overflow-hidden">
                <div className="flex w-max animate-marquee">
                    {[...testimonials, ...testimonials].map((item, index) => (
                        <TestimonialCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
