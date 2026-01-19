"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const TopBar = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setHide(scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 themeDark
        h-[40px]
        transition-transform duration-300
        ${hide ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="max-w-6xl mx-auto px-2 md:px-4 h-full text-white text-xs md:text-sm flex items-center justify-between">
        
        {/* LEFT: Phone + Email (mobile & desktop) */}
        <div className="flex items-center gap-1 md:gap-4">
          <a href="tel:+61430410450" className="flex items-center gap-1">
            <FaPhoneAlt className="text-[8px] md:text-sm" />
            <span className="sm:inline">+61430410450</span>
          </a>

          <a href="mailto:sunburycarrentals@gmail.com" className="flex items-center gap-1">
            <FaEnvelope className="text-[8px]  md:text-sm" />
            <span className="sm:inline">sunburycarrentals@gmail.com</span>
          </a>
        </div>

        {/* RIGHT: Social Icons (mobile & desktop) */}
        <div className="flex items-center gap-1 md:gap-3 text-sm md:text-base">
          <Link href="#"><FaFacebookF /></Link>
          <Link href="#"><FaInstagram /></Link>
          <Link href="#"><FaLinkedinIn /></Link>
          <Link href="#"><FaTwitter /></Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
