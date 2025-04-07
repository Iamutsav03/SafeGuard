import React, { useState, useEffect } from "react";

function SosButton() {
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount + 1 === 3) {
      triggerSos();
    }
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => setClickCount(0), 3000));
  };

  const triggerSos = () => {
    alert("SOS Button Triggered!");
  };

  return (
    <button
      className="w-32 h-32 bg-red-700 text-white text-3xl font-bold rounded-full flex items-center justify-center hover:bg-red-800 active:bg-red-900 transition duration-300"
      onClick={handleClick}
    >
      SOS
    </button>
  );
}

export default SosButton;
