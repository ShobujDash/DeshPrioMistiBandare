const express = require("express");
const { getAllCategories, getAllProducts, getCategoryById, getProductById } = require("../controllers/CommonController");


const commonRouter = express.Router();

commonRouter.get("/getAllCategory", getAllCategories);
commonRouter.get("/category/:id", getCategoryById);
commonRouter.get("/getAllProducts", getAllProducts);
commonRouter.get("/product/:id", getProductById);

module.exports = commonRouter;
