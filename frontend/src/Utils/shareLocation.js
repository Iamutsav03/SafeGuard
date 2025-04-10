import axios from "axios";

export const shareLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await axios.post("http://localhost:5000/api/share-location", {
            latitude,
            longitude,
          });
          resolve();
        } catch (err) {
          reject(err);
        }
      },
      (err) => reject(err.message)
    );
  });
