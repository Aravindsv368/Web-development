const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

// Get all orders for a specific customer
router.get("/customer/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const orders = await Order.find({ user_id: userId });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Get a specific order by order_id
router.get("/:order_id", async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const order = await Order.findOne({ order_id: orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
