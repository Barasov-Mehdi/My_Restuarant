const express = require("express");
const router = express.Router();
const GarsonCall = require("../models/GarsonCall");

// Anasayfa
router.get("/", (req, res) => {
    res.render("home");
});

// Butona tıklama
router.post("/call-garson/:tableNumber", async (req, res) => {
    const tableNumber = req.params.tableNumber;

    const newCall = new GarsonCall({ tableNumber });
    await newCall.save();

    res.json({ success: true });
});

// Admin Sayfası
router.get("/admin", async (req, res) => {
    const calls = await GarsonCall.find().sort({ timestamp: -1 }).limit(5); // Son 5 çağrıyı al
    res.render("admin", { calls });
});

module.exports = router;