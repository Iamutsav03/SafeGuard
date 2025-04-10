import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import BottomNav from "./Home/BottomNav";
import SosButton from "./Home/SosButton";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-800 flex items-start justify-center p-4">
      <div className="h-full w-full max-w-[390px] max-h-[844px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
        <header className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md">
          <div className="flex items-center space-x-3">
            <FaShieldAlt size={28} className="text-red-500" />
            <h1 className="text-2xl font-bold tracking-wide">SafeGuard</h1>
          </div>
          <p className="text-sm italic text-gray-300">Your Safety Companion</p>
        </header>
        <main className="flex-grow flex items-center justify-center bg-gray-950 p-6 pt-37 pb-37">
          {" "}
          <div className="w-full flex justify-center">
            <SosButton />
          </div>
        </main>
        <BottomNav /> 
      </div>
    </div>
  );
}

export default App;
