const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModle");
const UserModel = require("../models/userModel");

// API to register user
const addCategory = async (req, res, next) => {
  try {
    const isAdmin = req.headers.isAdmin;

    // Check for admin authorization
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { categoryId, categoryName, categoryImg, imageId } = req.body;

    // Validate required fields
    if (!categoryName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const categoryData = { categoryName, categoryImg, imageId };

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
      productID,
      categoryID,
      productName,
      title,
      image,
      price,
      imageId,
      shortDes,
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
      productName,
      title,
      image,
      price,
      imageId,
      shortDes,
    };

    let result;

    if (productID) {
      // Update existing product
      result = await ProductModel.findByIdAndUpdate(
        productID,
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

    const { productID } = req.params;

    // Find the product by ID and delete it
    const deletedProduct = await ProductModel.findByIdAndDelete(productID);

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

// Add Product for user 
// Push or update a product in the user's products array
const pushOrUpdateProductToUser = async (req, res) => {
  const { userId, productId, price } = req.body;

  if (!userId || !productId || !price) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Provide all inputs",
      });
  }

  try {
    // Validate productId exists in the ProductModel
    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the product already exists in the user's products array
    const existingProduct = user.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      // Update the price and quantity of the existing product
      existingProduct.price = price;
    } else {
      // Push the new product with specified price and quantity
      user.products.push({ productId, price });
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully in user's products list.",
      products: user.products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

// delete product from user
// const deleteProductFromUser = async (req, res) => {
//   const { userId, productId } = req.body;

//   if (!userId || !productId) {
//     return res.status(400).json({
//       success: false,
//       message: "Provide both userId and productId",
//     });
//   }

//   try {
//     // Find the user and update their products array
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found!" });
//     }

//     // Filter out the product with the specified productId
//     const initialLength = user.products.length;
//     user.products = user.products.filter(
//       (product) => product.productId.toString() !== productId
//     );

//     // Check if a product was removed
//     if (user.products.length === initialLength) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found in user's list!" });
//     }

//     // Save the updated user document
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Product removed successfully from user's products list.",
//       products: user.products,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server Error!" });
//   }
// };
const deleteProductFromUser = async (req, res) => {
  const { userId, productId } = req.query; // Use query instead of body

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "Provide both userId and productId",
    });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const initialLength = user.products.length;
    user.products = user.products.filter(
      (product) => product.productId.toString() !== productId
    );

    if (user.products.length === initialLength) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in user's list!" });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product removed successfully from user's products list.",
      products: user.products,
    });
  } catch (error) {
    console.error("Error in deleteProductFromUser:", error);
    return res.status(500).json({ success: false, message: "Server Error!" });
  }
};



module.exports = {
  addCategory,
  addProduct,
  deleteCategoryById,
  deleteProductById,
  pushOrUpdateProductToUser,
  deleteProductFromUser,
};
