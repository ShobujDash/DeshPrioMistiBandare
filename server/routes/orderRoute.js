const express = require("express");
const { createOrder, getAllOrders, getSingleOrder, updateOrder, deleteOrder, getOrdersByUserID } = require("../controllers/OrderControler");
const AuthVerification = require("../middlewares/AuthVerification");

const router = express.Router();

router.post("/createOrder", AuthVerification, createOrder);
router.get("/getAllOrders",AuthVerification, getAllOrders);
router.get("/singleOrder/:id",AuthVerification, getSingleOrder);
router.put("/updateOrder/:id",AuthVerification , updateOrder);
router.delete("/deleteOrder/:id",AuthVerification, deleteOrder);
router.get("/getOrdersByUserID", AuthVerification, getOrdersByUserID);

module.exports = router;
