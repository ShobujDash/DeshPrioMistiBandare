const express = require("express");
const router = express.Router();
const storeProductController = require("../controllers/StoreProductController.js");
const AuthVerification = require("../middlewares/AuthVerification.js");

// Create a product
router.post("/",AuthVerification, storeProductController?.createProduct);

// Get all products
router.get("/",AuthVerification, storeProductController.getAllProducts);

// Get a single product by ID
router.get("/:id",AuthVerification, storeProductController.getProductById);

// Update a product by ID
router.put("/:id",AuthVerification, storeProductController.updateProduct);

// Delete a product by ID
router.delete("/:id",AuthVerification, storeProductController.deleteProduct);

module.exports = router;
