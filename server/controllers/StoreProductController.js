const StoreProductModel = require("../models/StoreProductModel.js");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const isExitsProduct = await StoreProductModel.find({{
      productName: req.body.productName,
    }})
    if (isExitsProduct) {
      return res.status(201).json({ success: false, message: "This Product Is Already Exits" });
    }
    const product = new StoreProductModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Read all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await StoreProductModel.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Read a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await StoreProductModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await StoreProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await StoreProductModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
