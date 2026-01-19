'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import BookingFormModel from "../modalpup/BookingFormModel.jsx";

export default function FleetInfo() {
  const [activeTab, setActiveTab] = useState("All");
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH CARS ---------------- */
  const fetchCars = async (category = "All") => {
    try {
      setLoading(true);

      const url =
        category === "All"
          ? "/api/cars"
          : `/api/cars?category=${category}`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        setCars(json.data);

        // build categories once
        const uniqueCategories = [
          "All",
          ...new Set(
            json.data
              .filter((c) => c.category)
              .map((c) => c.category)
          ),
        ];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(activeTab);
  }, [activeTab]);

  /* ---------------- MODAL ---------------- */
  const openBookingForm = (car) => {
    setSelectedCar(car);
    setIsBookingFormOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedCar(null);
  };

  useEffect(() => {
    document.body.style.overflow = isBookingFormOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isBookingFormOpen]);

  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* ---------- TITLE ---------- */}
        <div className="flex items-center gap-4 mb-10">
          <span className="flex-1 h-px bg-gray-300" />
          <h1 className="text-2xl md:text-4xl font-bold whitespace-nowrap">
            Our Fleet
          </h1>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        <p className="text-center text-gray-500 mb-8">
          Explore our diverse range of vehicles – from economy to premium rides, luxury sedans, and commercial vans.
          <br />
          <strong>Custom requests? Just get in touch!</strong>
        </p>
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-md border transition capitalize
                ${
                  activeTab === category
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ---------- GRID ---------- */}
        {loading ? (
          <p className="text-center text-gray-500">Loading cars...</p>
        ) : cars.length === 0 ? (
          <p className="text-center text-gray-500">No cars found</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white overflow-hidden border rounded-lg shadow transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                <Image
                  src={car.carImages?.[0] || "/placeholder.png"}
                  alt={car.carName}
                  width={500}
                  height={300}
                  className="w-full h-52 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
                />

                <div className="p-5">
                  <div className="flex justify-between mb-3">
                    {car.category && (
                      <span className="px-3 py-1 text-sm bg-black text-white rounded-full">
                        {car.category}
                      </span>
                    )}

                    {car.serviceType === "RENTAL" && (
                      <span className="font-semibold">
                        ${car.rentalPrice}/days
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">{car.carName}</h3>
                  <p className="text-gray-500">{car.carDetails}</p>

                  {car.amenities?.length > 0 && (
                    <ul className="my-3 space-y-1">
                      {car.amenities.map((a, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          ✔ {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex gap-3">
                    <a
                      href="tel:+1234567890"
                      className="flex-1 text-center py-2 bg-blue-500 text-white rounded-full transition-colors duration-300 hover:bg-blue-600"
                    >
                      Call
                    </a>

                    <button
                      onClick={() => openBookingForm(car)}
                      className="flex-1 py-2 bg-green-500 text-white rounded-full transition-colors duration-300 hover:bg-green-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isBookingFormOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-2"
          onClick={closeBookingForm}
        >
          <div
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBookingForm}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <AiOutlineClose size={24} />
            </button>

            <BookingFormModel
              car={selectedCar}
              onClose={closeBookingForm}
            />
          </div>
        </div>
      )}
    </section>
  );
}
