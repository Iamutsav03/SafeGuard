import React from "react";
import { FaShieldAlt } from "react-icons/fa"; // Adding a security icon for visual appeal
import BottomNav from "./Home/BottomNav";
import GetLocate from "./Home/GetLocate";
import SosButton from "./Home/SosButton";

function App() {
  return (
    <>
      <header className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-b-xl shadow-lg">
        <div className="flex items-center space-x-2">
          <FaShieldAlt size={36} />
          <h1 className="text-4xl font-extrabold">SafeGuard</h1>
        </div>
        <p className="text-lg italic">Your Safety Companion</p>
      </header>

      <SosButton />
      <GetLocate/>
      <BottomNav />
    </>
  );
}

export default App;
