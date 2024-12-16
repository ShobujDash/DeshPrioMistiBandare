const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModle");


// Get all category
const getAllCategories = async (req, res, next) => {
  try {
    // Fetch all categories sorted by creation time (newest first)
    const categories = await CategoryModel.find().sort({ createdAt: -1 });

    // If no categories are found
    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }

    // Respond with the list of categories
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// Get all product
const getAllProducts = async (req, res, next) => {
  try {
    // Fetch all categories from the database
    const products = await ProductModel.find();

    // If no categories are found
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Products found" });
    }

    // Respond with the list of categories
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};


// Get a single category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Fetch the category by ID from the database
    const category = await CategoryModel.findById(categoryId);

    // If the category is not found
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Respond with the category
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// Get a single product by ID
const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Fetch the product by ID from the database
    const product = await ProductModel.findById(productId);

    // If the product is not found
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Respond with the product
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};






module.exports = {
  getAllCategories,
  getAllProducts,
  getProductById,
  getCategoryById
};
