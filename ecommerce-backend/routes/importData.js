const express = require("express");
const csv = require("csvtojson");
const User = require("../models/User");
const Order = require("../models/Order");
const router = express.Router();
const path = require("path");

router.post("/upload", async (req, res) => {
  try {
    // Delete existing data
    await User.deleteMany({});
    await Order.deleteMany({});

    // Load users.csv
    const usersPath = path.join(__dirname, "../data/users.csv");
    const usersData = await csv().fromFile(usersPath);

    const formattedUsers = usersData.map((u) => ({
      _id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      age: Number(u.age),
      gender: u.gender,
      address: {
        state: u.state,
        street_address: u.street_address,
        postal_code: u.postal_code,
        city: u.city,
        country: u.country,
        latitude: parseFloat(u.latitude),
        longitude: parseFloat(u.longitude),
      },
      traffic_source: u.traffic_source,
      created_at: new Date(u.created_at),
    }));

    await User.insertMany(formattedUsers);

    // Load orders.csv
    const ordersPath = path.join(__dirname, "../data/orders.csv");
    const ordersData = await csv().fromFile(ordersPath);

    const formattedOrders = ordersData.map((o) => ({
      order_id: o.order_id,
      user_id: o.user_id,
      status: o.status,
      gender: o.gender,
      created_at: new Date(o.created_at),
      returned_at: o.returned_at ? new Date(o.returned_at) : null,
      shipped_at: o.shipped_at ? new Date(o.shipped_at) : null,
      delivered_at: o.delivered_at ? new Date(o.delivered_at) : null,
      num_of_item: Number(o.num_of_item),
    }));

    await Order.insertMany(formattedOrders);

    res
      .status(200)
      .json({ message: "Users and Orders imported successfully." });
  } catch (error) {
    console.error("❌ Import error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
