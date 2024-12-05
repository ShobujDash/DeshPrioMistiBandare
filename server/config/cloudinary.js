const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// Configure with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "deshprio", // Optional: specify a folder in Cloudinary
      resource_type: "image", // Ensure the resource is treated as an image
    });
    return result; // Returns the Cloudinary result object
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Error uploading to Cloudinary");
  }
};


// const deleteMediaFromCloudinary = async (publicID) => {
//   try {
//     await cloudinary.uploader.destroy(publicID);
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to delete asset from Cloudinary");
//   }
// };

const deleteMediaFromCloudinary = async (publicID) => {
  try {
    if (typeof publicID !== "string") {
      throw new Error("Invalid publicID provided. It must be a string.");
    }
    await cloudinary.uploader.destroy(`deshprio/${publicID}`);
    console.log(`Successfully deleted asset with publicID ${publicID}`);
    return {
      success: true,
      message: `Asset with publicID ${publicID} deleted successfully.`,
    };
  } catch (error) {
    console.error(`Failed to delete asset with publicID ${publicID}:`, error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};


module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
