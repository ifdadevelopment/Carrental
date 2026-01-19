"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/lib/axiosInstance";

const BookingForm = () => {
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const payload = {
      bookingType: "RIDE",
      pickupLocation: form.get("pickupLocation"),
      pickupDate: form.get("pickupDate"),
      returnDate: form.get("returnDate"),
      pickupTime: form.get("pickupTime"),
      fullName: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
    };

    try {
      const res = await axiosInstance.post("/api/bookings", payload);

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Booking failed");
      }

      toast.success("Booking request submitted successfully!");
      e.target.reset();

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
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white md:p-8 p-2 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Book Your Ride
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Pickup Location *
              </label>
              <select
                name="pickupLocation"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select location *</option>
                <option value="Sunbury - Jackson Road">Sunbury - Jackson Road</option>
                <option value="Melbourne CBD">Melbourne CBD</option>
                <option value="Melbourne Airport">Melbourne Airport</option>
                <option value="Richmond">Richmond</option>
                <option value="Brunswick">Brunswick</option>
                <option value="Essendon">Essendon</option>
                <option value="Footscray">Footscray</option>
                <option value="Werribee">Werribee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Pickup Date *
              </label>
              <input
                type="date"
                name="pickupDate"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Return Date *
              </label>
              <input
                type="date"
                name="returnDate"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Pickup Time *
              </label>
              <input
                type="time"
                name="pickupTime"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Your Phone *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+61 xxx xxx xxx"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 headerBtn border border-gray-300 rounded-md transition duration-300 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Booking Request"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookingForm;
