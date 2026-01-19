'use client';
import Image from "next/image";
import { fleet } from '../data/fleetData';

export default function OurFleetInfo() {
  return (
    <section className="py-16 bg-white overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-10">
          <span className="flex-1 h-px bg-gray-300" />
          <h1 className="text-2xl md:text-4xl font-bold whitespace-nowrap">Our Fleet</h1>
          <span className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="mb-8 text-center">
          <p className="text-gray-500 text-md md:text-lg">
            Economy cars, rideshare-ready vehicles, commercial vans, and premium options – all set up for work and everyday life.
            <br />
            <strong>More cars available on request – contact us for current availability.</strong>
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {fleet.map((car, index) => (
              <div
                key={`first-${index}`}
                className="mx-6 flex items-center justify-center min-w-[350px] h-[300px] border rounded-lg p-4 relative overflow-hidden group"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  <p className="text-lg font-semibold text-center">{car.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
