"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SiteLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // loader duration

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md animate-pulse">
          <Image
            src="/logo.png"   
            alt="Sunbury Rentals"
            width={60}
            height={60}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SiteLoader;
