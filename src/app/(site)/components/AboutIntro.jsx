'use client';
import Image from "next/image";
import { galleryImages } from '../data/fleetData';


export default function AboutIntro() {


  return (
    <section className="w-full py-16 bg-white font-Montserrat">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
          <p className="global-color font-semibold mb-2">
            About Chauffeur Car Melbourne
          </p>

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-6">
            Trusted Chauffeur Hire Melbourne
          </h2>

          <div className="space-y-5 text-gray-600 text-[15px] leading-relaxed">
            <p>
              For over <strong>20 years</strong>, Chauffeur Car Melbourne has been delivering
              reliable and luxury chauffeur services in Melbourne. From corporate
              transfers and airport pickups to weddings, private events, and
              long-distance tours, we provide a refined travel experience built
              on punctuality, comfort, and professionalism.
            </p>

            <p>
              What started as a single luxury vehicle has grown into one of
              Melbourne’s most dependable chauffeur hire companies. With more
              than two decades of industry experience, we understand Melbourne’s
              roads, schedules, and client expectations better than anyone.
            </p>

            <p>
              Our licensed chauffeurs are trained to deliver safe, courteous,
              and stress-free journeys. Every vehicle in our fleet is
              meticulously maintained, ensuring a smooth and comfortable ride
              every time you book chauffeur hire in Melbourne.
            </p>

            <p>
              Our Melbourne-based chauffeur hire services are trusted by
              business professionals, families, and international visitors who
              value discreet service and premium vehicles.
            </p>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-[260px] overflow-hidden rounded-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
