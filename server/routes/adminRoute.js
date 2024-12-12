const express = require("express");

const AuthVerification = require("../middlewares/AuthVerification");
const {
  addProduct,
  addCategory,
  deleteCategoryById,
  deleteProductById,
  pushOrUpdateProductToUser,
  deleteProductFromUser,
} = require("../controllers/AdminController");

const { getAllUsers } = require("../controllers/userController");

const adminRouter = express.Router();

adminRouter.post("/addCategory", AuthVerification, addCategory);
adminRouter.delete(
  "/delete-category/:categoryId",
  AuthVerification,
  deleteCategoryById
);
adminRouter.post("/addProduct", AuthVerification, addProduct);
adminRouter.delete("/delete-product/:productID", AuthVerification, deleteProductById);
adminRouter.get("/getAllUsers", AuthVerification, getAllUsers);

adminRouter.post(
  "/add-or-update-users-product",
  AuthVerification,
  pushOrUpdateProductToUser
);
adminRouter.post(
  "/add-or-update-users-product",
  AuthVerification,
  pushOrUpdateProductToUser
);

adminRouter.delete(
  "/delete-users-product",
  AuthVerification,
  deleteProductFromUser
);




module.exports = adminRouter;
