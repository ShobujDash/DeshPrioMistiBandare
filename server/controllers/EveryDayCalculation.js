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
    res.status(200).json({success:true, message: "Entry added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding entry.", error });
  }
};

// Get all entries to TodayEntryModel for today's date or seleted date
const getToadyEntryProducts = async (req, res) => {
  try {
    // ফ্রন্টএন্ড থেকে তারিখ গ্রহণ করা
    const { date } = req.params; // উদাহরণ: date="2024-12-15"

    let startDate, endDate;
    if (date) {
      // যদি তারিখ পাওয়া যায়, সেটিকে ফিল্টার করার জন্য ব্যবহার করা হবে
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 1);
    } else {
      // যদি তারিখ না পাঠানো হয়, তাহলে আজকের তারিখ ব্যবহার করা হবে
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
    }

    // ডেটা খুঁজে বের করা
    const entries = await TodayEntryModel.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

  
      // রেসপন্স পাঠানো
      res.status(200).json({
        success: true,
        message: "Entries fetched successfully.",
        entries,
      });
   
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries.", error });
  }
};


// Get all exits to TodayExitModel for today's date or 
const handleExit = async (req, res) => {
  try {
    const exit = req.body; // Single object
    const store = await StoreModel.findOne();

    if (!store) {
      return res.status(404).json({success:false, message: "Store not found." });
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
      res.status(200).json({success:true, message: "Exit handled successfully." });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Product not found in store." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error handling exit.", error });
  }
};

// Get all exits to TodayEntryModel for today's date or seleted date
const getToadyExitsProducts = async (req, res) => {
  try {
    // ফ্রন্টএন্ড থেকে তারিখ গ্রহণ করা
    const { date } = req.params; // উদাহরণ: date="2024-12-15"

    let startDate, endDate;
    if (date) {
      // যদি তারিখ পাওয়া যায়, সেটিকে ফিল্টার করার জন্য ব্যবহার করা হবে
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 1);
    } else {
      // যদি তারিখ না পাঠানো হয়, তাহলে আজকের তারিখ ব্যবহার করা হবে
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
    }

    // ডেটা খুঁজে বের করা
    const exits = await TodayExitModel.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

  
      // রেসপন্স পাঠানো
      res.status(200).json({
        success: true,
        message: "Exits fetched successfully.",
        exits,
      });
   
   
  } catch (error) {
    res.status(500).json({ message: "Error fetching exits.", error });
  }
};





// Get all products from StoreModel
const getStoreProducts = async (req, res) => {
  try {
    const store = await StoreModel.findOne();
    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }
    res.status(200).json({success:true, message:"get all store product succesfully", storePorducts: store.products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching store products.", error });
  }
};

module.exports = {
  addEntry,
  handleExit,
  getStoreProducts,
  getToadyEntryProducts,
  getToadyExitsProducts,
};
