'use client';
import React from "react";
import { FaCar, FaDollarSign, FaTools, FaPhoneAlt } from "react-icons/fa"; 

const WhyChooseUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 py-6 md:py-16 font-sans ">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-2">Why Drivers Choose Sunbury Rentals</h2>
      <p className="text-center text-sm md:text-md  mb-8 text-gray-500">
        Whether you're driving for Uber, DiDi, deliveries or just need a reliable car, we make it simple, flexible, and affordable for locals in Sunbury and Melbourne.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 py-4 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg">
          <FaDollarSign className="text-4xl global-color  mb-6 mt-4 font-poppins" />
          <h3 className="text-lg font-semibold mb-2">Fair & Transparent Weekly Rates</h3>
          <p className="text-gray-600">
            Clear pricing from $170/week with no hidden surprises. Easy weekly payments that work with your cash flow.
          </p>
        </div>
        <div className="flex flex-col items-center text-center  p-4 bg-white shadow-lg rounded-lg">
          <FaCar className="text-4xl global-color  mb-6 mt-4 font-poppins" />
          <h3 className="text-lg font-semibold mb-2">Fully Serviced, Ready to Work</h3>
          <p className="text-gray-600">
            Our cars are regularly serviced, cleaned and checked so you can drive confidently every day and focus on earning.
          </p>
        </div>
        <div className="flex flex-col items-center text-center  p-4 bg-white shadow-lg rounded-lg">
          <FaPhoneAlt className="text-4xl global-color  mb-6 mt-4 font-poppins" />
          <h3 className="text-lg font-semibold mb-2">Local Sunbury Support</h3>
          <p className="text-gray-600">
            Speak directly with a local owner, not a call center. Fast help, flexible pickup options, and honest advice.
          </p>
        </div>
        <div className="flex flex-col items-center text-center  p-4 bg-white shadow-lg rounded-lg">
          <FaTools className="text-4xl global-color  mb-6 mt-4 font-poppins" />
          <h3 className="text-lg font-semibold mb-2">Fully Serviced, Ready to Work</h3>
          <p className="text-gray-600">
            Our cars are regularly serviced, cleaned, and checked so you can drive confidently every day and focus on earning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
