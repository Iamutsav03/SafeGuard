import React, { useState, useRef } from "react";
import axios from "axios";
import { recordAudio } from "../Utils/audioRecorder";
import { capturePhoto } from "../Utils/photoCapture";
import { shareLocation } from "../Utils/shareLocation";

function SosButton() {
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isEmergency, setIsEmergency] = useState(false);

  const audioIntervalRef = useRef(null);
  const photoIntervalRef = useRef(null);
  const locationIntervalRef = useRef(null);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount + 1 === 3) {
      triggerSos();
    }

    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => setClickCount(0), 3000));
  };

  const triggerSos = () => {
    alert("🚨 SOS Triggered!");
    setIsEmergency(true);
    startEmergency();
  };

  const stopEmergency = () => {
    alert("🛑 Emergency Stopped");
    setIsEmergency(false);

    clearInterval(audioIntervalRef.current);
    clearInterval(photoIntervalRef.current);
    clearInterval(locationIntervalRef.current);
  };

  const startEmergency = async () => {
    await handleAudioLoop();
    handlePhotoLoop();
    handleLocationLoop();
  };

  const handleAudioLoop = async () => {
    const recordAndSend = async () => {
      const audioBlob = await recordAudio(10000); // 10 sec
      if (!audioBlob) return;
      const formData = new FormData();
      formData.append("audio", audioBlob, `recording-${Date.now()}.webm`);

      try {
        await axios.post("http://localhost:5000/api/upload", formData);
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
    };

    recordAndSend();
    audioIntervalRef.current = setInterval(recordAndSend, 10000);
  };

  const handlePhotoLoop = () => {
    const captureAndSend = async () => {
      const imageBlob = await capturePhoto();
      if (!imageBlob) return;
      const formData = new FormData();
      formData.append("photo", imageBlob, `photo-${Date.now()}.png`);

      try {
        await axios.post("http://localhost:5000/api/upload", formData);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    };

    captureAndSend();
    photoIntervalRef.current = setInterval(captureAndSend, 5000);
  };

  const handleLocationLoop = () => {
    const share = async () => {
      const location = await shareLocation();
      if (location) {
        try {
          await axios.post("http://localhost:5000/api/location", location);
        } catch (error) {
          console.error("Location upload error:", error);
        }
      }
    };

    share();
    locationIntervalRef.current = setInterval(share, 15000); // update every 15 sec
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="w-40 h-40 bg-red-600 text-white text-4xl font-extrabold rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out ring-4 ring-red-700 ring-opacity-40 hover:ring-8 hover:ring-red-500 focus:outline-none focus:ring-8 focus:ring-red-500"
        onClick={handleClick}
        disabled={isEmergency}
      >
        SOS
      </button>

      {isEmergency && (
        <button
          className="mt-4 px-6 py-2 bg-white text-red-700 border border-red-700 rounded-lg hover:bg-red-50 transition"
          onClick={stopEmergency}
        >
          Stop Emergency
        </button>
      )}
    </div>
  );
}

export default SosButton;
