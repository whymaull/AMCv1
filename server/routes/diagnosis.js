
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM diagnosis");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil diagnosis", error: err.message });
  }
});

module.exports = router;
