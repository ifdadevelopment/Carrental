"use client";
import Image from "next/image";

export default function FleetCard({ car, onBook }) {
  return (
    <div
     className="border rounded-lg bg-white flex-shrink-0 w-[280px] lg:w-[300px]"

    >
      {/* IMAGE */}
      <div className="relative w-full h-[180px]">
        <Image
          src={car.image}
          alt={car.title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 1024px) 280px, 300px"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="font-bold text-md">{car.title}</h3>

        <div className="flex mt-2">
          {[...Array(car.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">★</span>
          ))}
        </div>

        <p className="text-sm mt-2">
          No. of Passengers: <span className="font-semibold">{car.passengers}</span>
        </p>
        <p className="text-sm">
          Luggage Pieces: <span className="font-semibold">{car.luggage}</span>
        </p>

        <button
          onClick={() => onBook(car)}
          className="mt-4 headerBtn px-6 py-2 font-semibold w-full"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
