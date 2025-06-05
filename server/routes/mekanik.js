const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nama FROM mekanik");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil mekanik", error: err.message });
  }
});

module.exports = router;
