import React from "react";
import { FaHome, FaMapMarkedAlt, FaRunning } from "react-icons/fa";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full max-w-[390px] left-1/2 transform -translate-x-1/2 bg-gray-900 border-t border-gray-700 shadow-lg rounded-t-xl z-50">
      <div className="flex justify-around items-center py-3 px-4 text-gray-400">
        <NavItem icon={<FaHome size={22} />} label="Home" active />
        <NavItem icon={<FaMapMarkedAlt size={22} />} label="Safety Map" />
        <NavItem icon={<FaRunning size={22} />} label="Train" />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <a
      href="#"
      className={`flex flex-col items-center justify-center text-xs transition duration-200 ${
        active ? "text-red-500 font-semibold" : "hover:text-red-400"
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </a>
  );
}

export default BottomNav;
