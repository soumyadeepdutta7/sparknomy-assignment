"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Header = ({ currentView }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second if in mobile view
  useEffect(() => {
    if (currentView !== "mobile") return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or view change
  }, [currentView]);

  const getHeaderClasses = () => {
    switch (currentView) {
      case "mobile":
        return "flex items-center justify-between p-4 bg-[#E8CDE6]";
      case "tablet":
        return "flex items-center justify-between p-6 bg-[#E8CDE6]";
      case "desktop":
        return "flex items-center justify-between p-8 bg-[#E8CDE6]";
      default:
        return "flex items-center justify-between p-4 bg-[#E8CDE6]";
    }
  };

  // Format time as HH:MM (e.g., "09:41")
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={getHeaderClasses()}>
      {currentView === "mobile" && (
        <div className="bg-[#E8CDE6] absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-3 font-semibold">
          <span className="text-[#010101] text-[17px]">{formattedTime}</span>
          <div className="flex items-center gap-[7px]">
            <img src="/notification-bar/Network.svg" alt="network-icon" />
            <img src="/notification-bar/Wifi.svg" alt="wifi-icon" />
            <img src="/notification-bar/Battery.svg" alt="battery-icon" />
          </div>
        </div>
      )}
      <div
        className={`flex items-center justify-between w-full ${
          currentView === "mobile" ? "mt-8" : ""
        }`}
      >
        {/* Back section */}
        <div className="flex items-center gap-2">
          <img src="/notification-bar/Chevron.svg" alt="back-icon" />
          <h1 className="text-lg text-[#212529]">Back</h1>
        </div>

        {/* Dashboard title */}
        <h1 className="text-[17px] font-semibold text-black font-roboto">
          Dashboard
        </h1>

        {/* Profile Avatar */}
        <button className="w-[40px] h-[40px] from-purple-400 to-pink-400 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
          <div className="w-full h-full">
            <img
              src="/notification-bar/Avatar.svg"
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
