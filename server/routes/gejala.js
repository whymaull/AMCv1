const express = require("express");
const router = express.Router();
const GejalaModel = require("../models/gejalamodel");

router.get("/", async (req, res) => {
  try {
    const gejala = await GejalaModel.getAllGejala();
    res.json(gejala);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data gejala", error: err.message });
  }
});

router.get("/pendukung/:id", async (req, res) => {
  try {
    const data = await GejalaModel.getGejalaPendukung(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil gejala pendukung", error: err.message });
  }
});

module.exports = router;
