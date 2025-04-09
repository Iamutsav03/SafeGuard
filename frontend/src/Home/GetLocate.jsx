import axios from "axios";
import { useState } from "react";

const GetLocate = () => {
  const [locate, setLocate] = useState("");
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post("http://localhost:5000/api/share-location", {
              latitude,
              longitude,
            });
            const { latitude: lat, longitude: lon } = response?.data?.data || {};
            setLocate(`Longitude: ${lon}, Latitude: ${lat}`);
          } catch (err) {
            setError("Error sending location: " + err.message);
          }
        },
        (err) => {
          setError("Error getting location: " + err.message);
        }
      );
    } else {
      setError("Geolocation not supported by this browser.");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl">Get Location</h1>
      <button onClick={getLocation} className="pointer-cursor bg-gray-300 p-2">Fetch Location</button>
      {locate && <p>{locate}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default GetLocate;
