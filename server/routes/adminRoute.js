const express = require("express");
const AuthVerification = require("../middlewares/AuthVerification") 
const {  addProduct, addCategory, deleteCategoryById, deleteProductById } = require("../controllers/AdminController") 

const adminRouter = express.Router();

adminRouter.post("/addCategory", AuthVerification, addCategory);
adminRouter.delete("/delete-category/:id", AuthVerification, deleteCategoryById);
adminRouter.post("/addProduct", AuthVerification, addProduct);
adminRouter.delete("/delete-product/:id", AuthVerification, deleteProductById);

module.exports =  adminRouter;
