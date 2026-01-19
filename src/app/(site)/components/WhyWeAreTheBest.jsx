'use client';
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import { accordionData } from '../data/fleetData';
export default function WhyWeAreTheBest() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-cover bg-center h-full py-20 relative z-0" style={{ backgroundImage: 'url("/assets/WhyWeAreTheBest.jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div> 
      
      <div className="max-w-3xl mx-auto px-6 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why We Are The Best in The Industry
          </h2>
        </div>

        <div className="space-y-6 z-10 relative">
          {accordionData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <div
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between p-3 cursor-pointer bg-gray-50 border-b-2 border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="global-color" />
                  <h6 className="font-semibold text-sm">{item.title}</h6>
                </div>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden rounded-lg ${activeIndex === index ? 'h-auto p-4' : 'h-0 p-0'}`}
              >
                <p className="text-gray-600 text-sm">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
