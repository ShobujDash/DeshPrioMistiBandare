const express = require("express");
const router = express.Router();
const { addEntry, handleExit, getStoreProducts } = require("../controllers/EveryDayCalculation");
const AuthVerification = require("../middlewares/AuthVerification");

// Add single entry to TodayEntryModel and StoreModel
router.post("/store/entry", AuthVerification, addEntry);

// Add single exit to TodayExitModel and update StoreModel
router.post("/store/exit",AuthVerification, handleExit);

// Get all products from StoreModel
router.get("/store/products",AuthVerification ,getStoreProducts);

module.exports = router;
