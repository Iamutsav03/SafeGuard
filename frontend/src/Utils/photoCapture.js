import axios from "axios";

export const capturePhoto = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement("video");
  video.srcObject = stream;
  await video.play();

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg"));

  const formData = new FormData();
  formData.append("photo", blob, `photo-${Date.now()}.jpg`);

  await axios.post("http://localhost:5000/api/image/upload", formData);

  stream.getTracks().forEach((track) => track.stop());
};
