import React from "react";
import { FaHome, FaMapMarkedAlt, FaRunning } from "react-icons/fa"; // Using icons for better visuals

function BottomNav() {
  return (
    <div className="flex justify-center items-center bg-gray-800 p-4 text-white fixed bottom-0 w-full shadow-lg">
      <div className="flex items-center space-x-8">
        <a
          href="#"
          className="flex flex-col items-center text-lg hover:text-blue-400 transition duration-200"
        >
          <FaHome size={24} />
          <span className="text-sm">Home</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-lg hover:text-blue-400 transition duration-200"
        >
          <FaMapMarkedAlt size={24} />
          <span className="text-sm">Safety Map</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-lg hover:text-blue-400 transition duration-200"
        >
          <FaRunning size={24} />
          <span className="text-sm">Train Yourself</span>
        </a>
      </div>
    </div>
  );
}

export default BottomNav;
