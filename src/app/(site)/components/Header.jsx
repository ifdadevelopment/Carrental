'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import BookingModelForm from "../modalpup/BookingModelForm";
import ModalWrapper from "./ModalWrapper";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const menuRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    const onScroll = () => {
      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setScrolled(scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen((prevState) => !prevState); 
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className={`fixed left-0 w-full bg-white z-40 transition-all duration-300 h-[70px] md:h-[100px] shadow-md ${scrolled ? "top-0" : "top-[40px] md:top-[40px]"}`}>
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Sunbury Rentals" width={72} height={72} priority />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold font-sans text-md main-color">Sunbury Rentals</span>
            <span className="text-md global-secondary-color">Drive your dreams</span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-6 font-inter text-md font-medium global-secondary-color">
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/executive-chauffeur">Executive Chauffeur</Link>
          <Link href="/fleet">Fleet</Link>
          <Link href="/contact">Contact</Link>

          {/* Buttons on Desktop */}
          <div className="flex items-center gap-4 ml-6">
            {/* Call Now Button */}
            <a href="tel:+61430410450" className="flex items-center text-white headerBtn py-2 px-4">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
              Call Now
            </a>
            <button
              onClick={handleModalToggle} 
              className="text-white headerBtn py-2 px-4"
            >
              Book a Car
            </button>
          </div>
        </nav>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-xl" onClick={() => setOpen((prev) => !prev)}  aria-label="Toggle menu">
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div ref={menuRef} className="md:hidden bg-white border-t global-secondary-color">
          <nav className="flex flex-col p-4 gap-3">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about-us" onClick={() => setOpen(false)}>About Us</Link>
            <Link href="/executive-chauffeur" onClick={() => setOpen(false)}>Executive Chauffeur</Link>
            <Link href="/fleet" onClick={() => setOpen(false)}>Fleet</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

            {/* Mobile Buttons */}
            <div className="flex gap-4 mt-4">
              {/* Call Now Button */}
              <a href="tel:+61430410450" className="flex items-center headerBtn text-white py-2 px-4">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                Call Now
              </a>
              {/* Book a Car Button */}
              <button onClick={handleModalToggle} className="text-white headerBtn py-2 px-4">
                Book a Car
              </button>
            </div>
          </nav>
        </div>
      )}

 {isModalOpen && (
  <ModalWrapper onClose={handleModalToggle}>
    <BookingModelForm />
  </ModalWrapper>
)}
    </header>
  );
};

export default Header;
