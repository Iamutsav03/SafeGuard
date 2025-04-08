import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFile = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error("Error uploading file:", error);
    throw error;
  }
};

export { uploadFile };
