const express = require("express");
const { createOrder, getAllOrders, getSingleOrder, updateOrder, deleteOrder, getOrdersByUserID } = require("../controllers/OrderControler");
const AuthVerification = require("../middlewares/AuthVerification");

const router = express.Router();

router.post("/createOrder", AuthVerification, createOrder);
router.get("/getAllOrders", getAllOrders);
router.get("/singleOrder/:id", getSingleOrder);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);
router.get("/getOrdersByUserID", AuthVerification, getOrdersByUserID);

module.exports = router;
