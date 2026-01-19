"use client";

import Image from "next/image";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import BookingModelForm from "../modalpup/BookingModelForm";

const ExecutiveCar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBooking = () => setIsModalOpen(true);
  const closeBooking = () => setIsModalOpen(false);

  return (
    <>
      <section id="executive" className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <div className="text-xl font-semibold global-color mb-4">
                ✨ Lexus · Executive Chauffeur · Sunbury & Melbourne Airport
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Sunbury Executive Chauffeur Service
              </h2>

              <p className="text-lg text-gray-600 mb-6">
                Premium luxury sedans and SUVs (Lexus ES300, RX450) executive chauffeur service for Melbourne Airport transfers, corporate meetings, special occasions and VIP guests – with fixed pricing and personal support from a local Sunbury operator.
              </p>

              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                {/* ✅ FIXED BUTTON */}
                <button
                  onClick={openBooking}
                  className="py-4 px-6 global-bg text-white rounded-full transition duration-300 w-full sm:w-auto max-w-xs text-center"
                >
                  Request Chauffeur Booking
                </button>

                <a
                  href="https://wa.me/61430410450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 global-bg text-white rounded-full transition duration-300 w-full sm:w-auto max-w-xs text-center"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="lexus-card p-5 rounded-lg">
                <div className="lexus-label text-lg font-semibold global-color mb-2">
                  Executive Vehicle
                </div>

                <div className="lexus-name text-xl font-bold text-gray-800 mb-2">
                  Luxury Sedans and SUVs (Lexus ES300, RX450)
                </div>

                <div className="lexus-meta text-sm text-gray-500 mb-4 font-medium">
                  Leather interior · Quiet ride · Ideal for 1–5 passengers with luggage
                </div>

                <Image
                  src="/images/toyota-corolla.jpg"
                  alt="Lexus ES300 executive chauffeur car from Sunbury"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg"
                />

                <div className="text-sm text-gray-500 mt-4">
                  <div className="font-bold">From $120 · Sunbury ↔ Melbourne Airport</div>
                  <div>Fixed pricing · No surge · Professional driver</div>
                  <div className="font-medium mt-2">ABN registered · Fully insured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ MODAL */}
      {isModalOpen && (
        <ModalWrapper onClose={closeBooking}>
          <BookingModelForm onClose={closeBooking} />
        </ModalWrapper>
      )}
    </>
  );
};

export default ExecutiveCar;
