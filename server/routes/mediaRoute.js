const express = require("express");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../config/cloudinary");
const upload = require("../middlewares/multer");
const AuthVerification = require("../middlewares/AuthVerification");
const fs = require("fs").promises;

const mediaRouter = express.Router();

mediaRouter.post("/upload",AuthVerification, upload.single("image"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    await fs.unlink(req.file.path); // Cleanup local file
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading file.",
    });
  }
});

mediaRouter.delete("/delete/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Asset ID is required",
      });
    }

    await deleteMediaFromCloudinary(publicId);

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully from Cloudinary.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting file.",
    });
  }
});

mediaRouter.post(
  "/bulk-upload",
  upload.array("files", 10),
  async (req, res) => {
    try {
      const uploadPromises = req.files.map((fileItem) =>
        uploadMediaToCloudinary(fileItem.path)
      );

      const results = await Promise.all(uploadPromises);

      // Cleanup all files
      await Promise.all(req.files.map((file) => fs.unlink(file.path)));

      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in bulk uploading files.",
      });
    }
  }
);

module.exports = mediaRouter;
