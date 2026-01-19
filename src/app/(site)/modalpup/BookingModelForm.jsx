'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import axiosInstance from '../../api/lib/axiosInstance';

const BookingModelForm = ({ onClose }) => {
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

       const payload = {
       bookingType: "CHAUFFEUR",
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      email: form.get("email"),
      pickupLocation: form.get("pickupLocation"),
      dropoffLocation: form.get("dropoffLocation"),
      pickupDate: form.get("pickupDate"),
      pickupTime: form.get("pickupTime"),
      returnDate: form.get("returnDate") || null,
      passengers: parseInt(form.get("passengers")) || 1,
      tripType: form.get("tripType"),
      flightNumber: form.get("flightNumber"),
      notes: form.get("notes"),
    };


    try {
      const res = await axiosInstance.post("/api/bookings", payload);

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Booking failed");
      }

      toast.success("Booking submitted successfully!");
      e.target.reset();
      setTimeout(() => {
        onClose?.();
      }, 300);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
      console.error("Booking Error:", error);

    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-2">
      <div className=" md:p-8 p-1 rounded-xl">
        <h2 className="text-lg md:text-2xl font-bold mt-4 text-center mb-6">Request a Chauffeur Booking</h2>
        <p className="text-center text-sm mb-6 text-gray-500">
          Share your trip details below, and we'll confirm availability and final price by phone or WhatsApp.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">Mobile Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+61 4XX XXX XXX"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-semibold mb-1">Pickup Suburb *</label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                placeholder="e.g. Sunbury"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="dropoffLocation" className="block text-sm font-semibold mb-1">Drop-off / Destination *</label>
              <input
                type="text"
                id="dropoffLocation"
                name="dropoffLocation"
                placeholder="e.g. Melbourne Airport T1"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="passengers" className="block text-sm font-semibold mb-1">Passengers *</label>
              <select
                id="passengers"
                name="passengers"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Select option</option>
                <option>1 passenger</option>
                <option>2 passengers</option>
                <option>3 passengers</option>
                <option>4 passengers</option>
                <option>5 passengers</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="flightNumber" className="block text-sm font-semibold mb-1">Flight Number (if known)</label>
              <input
                type="text"
                id="flightNumber"
                name="flightNumber"
                placeholder="e.g. QF400"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="pickupDate" className="block text-sm font-semibold mb-1">Pickup Date *</label>
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="tripType" className="block text-sm font-semibold mb-1">Trip Type *</label>
              <select
                id="tripType"
                name="tripType"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select option</option>
                <option value="Airport Transfer">Airport Transfer</option>
                <option value="Corporate / Business">Corporate / Business</option>
                <option value="Event / Special Occasion">Event / Special Occasion</option>
                <option value="Hourly Hire">Hourly Hire</option>
                <option value="Other">Other / Not sure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="pickupTime" className="block text-sm font-semibold mb-1">Pickup Time *</label>
              <input
                type="time"
                id="pickupTime"
                name="pickupTime"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold mb-1">Additional Details / Stops / Notes</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Tell us about luggage, extra stops, return trip, child seat, etc."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="text-center mt-2 md:mt-6 mb-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 headerBtn border border-gray-300 rounded-md transition duration-300"
              >
                {loading ? "Sending..." : "Send Chauffeur Request"}

              </button>
            </div>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96 sm:h-40 max-h-[50vh] sm:overflow-y-auto overflow-y-auto">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={closeModal}>
              <AiOutlineClose className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <div className="space-y-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-semibold">{key.replace(/-/g, ' ')}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-6 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModelForm;
