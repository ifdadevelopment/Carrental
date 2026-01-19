'use client';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* CONTACTS SECTION */}
          <div>
            <h3 className="text-lg font-bold mb-4">OUR CONTACTS</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-[12px] font-semibold">Phone:</span>
                <a href="tel:+61430410450" className="text-blue-500 text-[12px] font-semibold hover:text-blue-600">
                  +61 430 410 450
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[12px] font-semibold">Email:</span>
                <a href="mailto:sunburycarrentals@gmail.com" className="text-blue-500 text-[12px] font-semibold hover:text-blue-600">
                  sunburycarrentals@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[12px] font-semibold">Address:</span>
                <span className="text-[12px] font-semibold">Jackson Road, Sunbury VIC 3429</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[12px] font-semibold">Hours:</span>
                <span className="text-[12px] font-semibold]">Open 7 days – by appointment</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[12px] font-semibold">ABN:</span>
                <span className="text-[12px] font-semibold">376 915 232 52</span>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS SECTION */}
          <div>
            <h3 className="text-lg font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[12px] font-semibold text-white hover:text-blue-500 transition duration-300">Home</a>
              </li>
              <li>
                <a href="#" className="text-[12px] font-semibold text-white hover:text-blue-500 transition duration-300">Executive Chauffeur</a>
              </li>
              <li>
                <a href="#" className="text-[12px] font-semibold text-white hover:text-blue-500 transition duration-300">Fleet</a>
              </li>
              <li>
                <a href="#" className="text-[12px] font-semibold text-white hover:text-blue-500 transition duration-300">Why Choose Us</a>
              </li>
              <li>
                <a href="#" className="text-[12px] font-semibold text-white hover:text-blue-500 transition duration-300">Get a Quote</a>
              </li>
              <li>
                <a href="#" className="text-[12px] font-semibold text-white hover:text-blue-500 transition duration-300">Locations</a>
              </li>
            </ul>
          </div>

          {/* GET IN TOUCH SECTION */}
          <div>
            <h3 className="text-lg font-bold mb-4">GET IN TOUCH</h3>
            <p className="text-gray-400 text-[12px] font-semibold mb-4">
              We’re always ready to help you find a suitable vehicle for rentals, rideshare, courier work, or executive chauffeur transfers. Contact us for availability and pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+61430410450" className="text-[10px] font-semibold text-white global-bg rounded-lg py-2 px-6  text-center hover:global-bg transition duration-300">
                Get in touch
              </a>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold text-white global-bg rounded-lg py-2 px-6 text-center hover:global-bg transition duration-300">
                View on map
              </a>
            </div>
          </div>

          {/* FOLLOW US SECTION */}
          <div className="space-x-6">
            <h3 className="text-lg font-bold mb-4">FOLLOW US</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FontAwesomeIcon icon={faFacebook} size="12px" />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FontAwesomeIcon icon={faInstagram} size="12px" />
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                <FontAwesomeIcon icon={faTwitter} size="12px" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8">
          <hr className="border-t border-gray-300" />
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-[12px] font-semibold text-center text-gray-400">
          <p>© {new Date().getFullYear()} Sunbury Rentals. Car Hire & Executive Chauffeur Service in Sunbury & Melbourne.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
