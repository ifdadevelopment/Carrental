"use client";

import { useState } from "react";
import axiosInstance from "../../api/lib/axiosInstance";
import toast from "react-hot-toast";

export default function ContactNearMe() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "Car Hire",
    message: "",
    formHeading: "Contact Near Me",
  });

  const contactInfo = {
    address: "Jackson Road, Sunbury VIC 3429",
    email: "sunburycarrentals@gmail.com",
    phone: "+61430410450",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/api/contact", form);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Enquiry submitted successfully!");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        serviceType: "Car Hire",
        message: "",
        formHeading: "Contact Near Me",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };


  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold global-color mb-3">
          Find a Chauffeur Service & Car Rental Near Me
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience luxury and convenience with trusted local chauffeur services tailored to your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps?q=Wallan%20VIC%203756&t=&z=12&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 flex flex-col"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Service Type</label>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Car Hire</option>
                <option>Car Rent</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Your Message</label>
              <textarea
                name="message"
                rows="3"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 global-bg text-white px-6 py-3 font-semibold rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "SEND ENQUIRY"}
          </button>

          <div className="mt-8 text-sm text-gray-600 space-y-1 border-t pt-4">
            <p><strong>Address:</strong> {contactInfo.address}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
