const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// Configure with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});



const uploadMediaToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading to Cloudinary");
  }
};

const deleteMediaFromCloudinary = async (publicID) => {
  try {
    await cloudinary.uploader.destroy(publicID);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
