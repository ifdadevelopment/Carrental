'use client';
import { useState } from 'react';
import Image from 'next/image';
import ModalWrapper from './ModalWrapper';
import BookingModelForm from '../modalpup/BookingModelForm';
import { fleetCar } from '../data/fleetData';



export default function OurFleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openBooking = (car) => {
    if (car.status !== 'Available') return;
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeBooking = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <section className="md:py-16 py-4 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleetCar.map((car) => (
            <div
              key={car.id}
              className="relative rounded-xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={car.image}
                alt={car.name}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center px-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {car.name}
                  </h3>
                  <button
                    onClick={() => openBooking(car)}
                    disabled={car.status !== 'Available'}
                    className={`block mx-auto px-6 py-2 rounded-full text-sm font-medium transition
                      ${car.status === 'Available'
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      }`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ModalWrapper onClose={closeBooking}>
          <BookingModelForm
            selectedCar={selectedCar?.name}
            onClose={closeBooking}
          />
        </ModalWrapper>
      )}
    </section>
  );
}
