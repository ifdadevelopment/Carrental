"use client";
import React from "react";
import axiosInstance from "../../api/lib/axiosInstance";
import toast from "react-hot-toast";


const ChauffeurBookingForm = () => {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const payload = {
      formHeading: "Chauffeur Booking Request",
      fullName: form.get("full-name"),
      phone: form.get("mobile"),
      email: form.get("email"),
      pickupLocation: form.get("pickup-suburb"),
      dropoff: form.get("dropoff"),
      pickupDate: form.get("pickup-date"),
      pickupTime: form.get("pickup-time"),
      returnDate: form.get("return-date") || null,
      passengers: parseInt(form.get("passengers")) || 1,
      tripType: form.get("trip-type"),
      flightNumber: form.get("flight-number"),
      notes: form.get("additional-details"),
    };

    try {
      const res = await axiosInstance.post("/api/bookings", payload);

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Booking failed");
      }

      toast.success("Booking submitted successfully!");
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
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <div className="bg-white p-2 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">Request a Chauffeur Booking</h2>
        <p className="text-center text-md mb-6 text-gray-500">
          Share your trip details below and we'll confirm availability and final price by phone or WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="full-name" className="block text-sm font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                id="full-name"
                name="full-name"
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
              <label htmlFor="mobile" className="block text-sm font-semibold mb-1">Mobile Number *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="+61 4XX XXX XXX"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="pickup-suburb" className="block text-sm font-semibold mb-1">Pickup Suburb *</label>
              <input
                type="text"
                id="pickup-suburb"
                name="pickup-suburb"
                placeholder="e.g. Sunbury"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="dropoff" className="block text-sm font-semibold mb-1">Drop-off / Destination *</label>
              <input
                type="text"
                id="dropoff"
                name="dropoff"
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
              <label htmlFor="flight-number" className="block text-sm font-semibold mb-1">Flight Number (if known)</label>
              <input
                type="text"
                id="flight-number"
                name="flight-number"
                placeholder="e.g. QF400"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="pickup-date" className="block text-sm font-semibold mb-1">Pickup Date *</label>
              <input
                type="date"
                id="pickup-date"
                name="pickup-date"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="trip-type" className="block text-sm font-semibold mb-1">Trip Type *</label>
              <select
                id="trip-type"
                name="trip-type"
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
              <label htmlFor="pickup-time" className="block text-sm font-semibold mb-1">Pickup Time *</label>
              <input
                type="time"
                id="pickup-time"
                name="pickup-time"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="additional-details" className="block text-sm font-semibold mb-1">Additional Details / Stops / Notes</label>
              <textarea
                id="additional-details"
                name="additional-details"
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
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Prefer to talk? Call +61 430 410 450 or message us on WhatsApp after sending the form.
        </p>
      </div>
    </div>
  );
};

export default ChauffeurBookingForm;
