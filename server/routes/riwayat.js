const express = require("express");
const router = express.Router();
const RiwayatModel = require("../models/riwayatmodel");

router.post("/", async (req, res) => {
  console.log("📌 Body yang dikirim ke riwayat:", req.body);

  try {
    await RiwayatModel.simpanRiwayat(req.body);
    res.json({ message: "Riwayat berhasil disimpan" });
  } catch (err) {
    console.error("❌ Gagal simpan riwayat:", err.message);
    res.status(500).json({ message: "Gagal menyimpan riwayat", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const riwayat = await RiwayatModel.getAllRiwayat();
    res.json(riwayat);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil riwayat", error: err.message });
  }
});

module.exports = router;
