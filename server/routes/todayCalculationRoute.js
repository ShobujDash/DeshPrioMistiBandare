const express = require("express");
const router = express.Router();
const { addEntry, handleExit, getStoreProducts, getToadyEntryProducts, getToadyExitsProducts } = require("../controllers/EveryDayCalculation");
const AuthVerification = require("../middlewares/AuthVerification");

// Add single entry to TodayEntryModel and StoreModel
router.post("/store/entry", AuthVerification, addEntry);

// Add single exit to TodayExitModel and update StoreModel
router.post("/store/exit",AuthVerification, handleExit);

// Get all products from StoreModel
router.get("/store/products", AuthVerification, getStoreProducts);

// Today's entries route
router.get("/entries/:date?", getToadyEntryProducts);

// Today's exits route
router.get("/exits/:date?", getToadyExitsProducts); 

module.exports = router;
