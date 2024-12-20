const StoreModel = require("../models/StoreModel");
const TodayEntryModel = require("../models/TodayEntryModel");
const TodayExitModel = require("../models/TodayExitModel");

// Add single entry to TodayEntryModel and update StoreModel
const addEntry = async (req, res) => {
  try {
    const entry = req.body; // Single object
    const store = await StoreModel.findOne(); // Assuming a single store

    if (!store) {
      // If no store exists, create one
      const newStore = new StoreModel({ products: [entry] });
      await newStore.save();
    } else {
      // Update existing store
      const existingProduct = store.products.find(
        (p) => p.productName === entry.productName
      );
      if (existingProduct) {
        existingProduct.qnt = (
          parseFloat(existingProduct.qnt) + parseFloat(entry.qnt)
        ).toString();
      } else {
        store.products.push(entry);
      }
      await store.save();
    }

    await TodayEntryModel.create(entry);
    res.status(200).json({ message: "Entry added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding entry.", error });
  }
};


// Add single exit to TodayExitModel and update StoreModel
const handleExit = async (req, res) => {
  try {
    const exit = req.body; // Single object
    const store = await StoreModel.findOne();

    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    const existingProduct = store.products.find(
      (p) => p.productName === exit.productName
    );

    if (existingProduct) {
      existingProduct.qnt = (
        parseFloat(existingProduct.qnt) - parseFloat(exit.qnt)
      ).toString();

      if (parseFloat(existingProduct.qnt) <= 0) {
        store.products = store.products.filter(
          (p) => p.productName !== exit.productName
        );
      }

      await store.save();
      await TodayExitModel.create(exit);
      res.status(200).json({ message: "Exit handled successfully." });
    } else {
      res.status(404).json({ message: "Product not found in store." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error handling exit.", error });
  }
};



// Get all products from StoreModel
const getStoreProducts = async (req, res) => {
  try {
    const store = await StoreModel.findOne();
    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }
    res.status(200).json(store.products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store products.", error });
  }
};

module.exports = {
  addEntry,
  handleExit,
  getStoreProducts,
};
