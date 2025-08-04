const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total_users: totalUsers,
        page,
        limit,
        total_pages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// 2. GET a specific customer + order count
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orderCount = await Order.countDocuments({ user_id: userId });

    res.status(200).json({
      success: true,
      data: {
        user,
        order_count: orderCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user detail:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
