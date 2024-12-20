const StoreProductModel = require("../models/StoreProductModel.js");



// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // প্রোডাক্টের নাম দিয়ে ডাটাবেজ থেকে খোঁজা
    const isExitsProduct = await StoreProductModel.findOne({
      productName: req.body.productName,
    });

    // যদি প্রোডাক্ট পাওয়া যায়
    if (isExitsProduct) {
      return res
        .status(400)
        .json({ success: false, message: "This Product Is Already Exists" });
    }

    // যদি প্রোডাক্ট না পাওয়া যায়, নতুন প্রোডাক্ট তৈরি
    const product = new StoreProductModel(req.body);
    const savedProduct = await product.save();

    // সফলভাবে প্রোডাক্ট সংরক্ষণ
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    // ত্রুটি থাকলে সেটি রিটার্ন করা
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
