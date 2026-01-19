'use client';

import { useEffect, useRef, useState } from "react";
import FleetCard from "./FleetCard";
import { fleetCarData } from "../data/fleetData";
import { initSlider } from "./FleetSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import BookingModelForm from "../modalpup/BookingModelForm";

export default function FleetSection() {
  const sliderRef = useRef(null);
  const sliderApi = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // ✅ Ensure SSR & first client render match
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Initialize slider only AFTER mount
  useEffect(() => {
    if (!mounted || !sliderRef.current) return;

    sliderApi.current = initSlider(sliderRef.current);
    sliderApi.current.init();

    return () => sliderApi.current?.destroy?.();
  }, [mounted]);

  const openBookingModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <section className="max-w-6xl mx-auto px-2 md:px-8 py-16 grid lg:grid-cols-[25%_75%] gap-8">
        <div>
          <p className="global-color font-semibold">
            Your Ride Awaits
          </p>
          <h2 className="text-xl md:text-3xl font-bold mt-2">
            Luxury Fleet for Chauffeur Hire Melbourne
          </h2>
          <p className="mt-4 text-gray-600">
            Travel in ultimate comfort with our modern, well-maintained vehicles.
          </p>
        </div>

        <div className="relative overflow-hidden group">
          <div
            ref={sliderRef}
            className="flex gap-6 items-stretch"
          >
            {fleetCarData.map((car, i) => (
              <FleetCard
                key={car.id ?? i}
                car={car}
                onBook={openBookingModal}
              />
            ))}
          </div>

          <button
            onClick={() => sliderApi.current?.prev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => sliderApi.current?.next()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {isModalOpen && (
        <ModalWrapper onClose={closeBookingModal}>
          <BookingModelForm selectedCar={selectedCar} onClose={closeBookingModal} />
        </ModalWrapper>
      )}
    </>
  );
}
