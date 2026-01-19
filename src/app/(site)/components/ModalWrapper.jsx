'use client';
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ModalWrapper({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-2 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          aria-label="Close modal"
        >
          <AiOutlineClose size={24} />
        </button>

        {children}
      </div>
    </div>
  );
}
