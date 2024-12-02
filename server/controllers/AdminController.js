const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModle");

// API to register user
const addCategory = async (req, res, next) => {
  try {
    const isAdmin = req.headers.isAdmin;

    // Check for admin authorization
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { categoryId, categoryName, categoryImg } = req.body;

    // Validate required fields
    if (!categoryName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const categoryData = { categoryName, categoryImg };

    let result;

    if (categoryId) {
      // Update existing category
      result = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { $set: categoryData },
        { new: true, upsert: false } // `new: true` returns the updated document
      );

      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Category updated", category: result });
    } else {
      // Create a new category
      const newCategory = new CategoryModel(categoryData);
      result = await newCategory.save();

      return res
        .status(201)
        .json({ success: true, message: "Category created", category: result });
    }
  } catch (error) {
    next(error);
  }
};


// API for user login
const addProduct = async (req, res, next) => {
  try {
    const isAdmin = req.headers.isAdmin;

    // Check for admin authorization
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const {
      productId, // Add productId for update
      categoryID,
      title,
      shortDes,
      price,
      descount,
      descountPrice,
      image,
      stock,
    } = req.body;

    // Validate required fields
    if (!categoryID || !title || !shortDes || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create a product data object
    const productData = {
      categoryID,
      title,
      shortDes,
      price,
      descount,
      descountPrice,
      image,
      stock,
    };

    let result;

    if (productId) {
      // Update existing product
      result = await ProductModel.findByIdAndUpdate(
        productId,
        { $set: productData },
        { new: true, upsert: false } // `new: true` returns the updated document
      );

      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Product updated", product: result });
    } else {
      // Create a new product
      const newProduct = new ProductModel(productData);
      result = await newProduct.save();

      return res
        .status(201)
        .json({ success: true, message: "Product created", product: result });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a single category by ID
const deleteCategoryById = async (req, res, next) => {
  try {
    const isAdmin = req.headers.isAdmin;

    // Check for admin authorization
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { categoryId } = req.params;

    // Find the category by ID and delete it
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    // If the category is not found
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Respond with a success message
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// Delete a single product
const deleteProductById = async (req, res, next) => {
  try {
    const isAdmin = req.headers.isAdmin;

    // Check for admin authorization
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { productId } = req.params;

    // Find the product by ID and delete it
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    // If the product is not found
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Respond with a success message
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};



module.exports = {
  addCategory,
  addProduct,
  deleteCategoryById,
  deleteProductById
};
