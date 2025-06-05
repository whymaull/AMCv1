
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const { tanggal, mekanik_id } = req.query;
  let filter = "";
  const params = [];

  if (tanggal) {
    filter += " AND DATE(waktu) = ?";
    params.push(tanggal);
  }

  if (mekanik_id) {
    filter += " AND id_mekanik = ?";
    params.push(mekanik_id);
  }

  try {
    const [rows] = await db.query(`
      SELECT diagnosis, COUNT(*) AS jumlah
      FROM riwayat_diagnosa
      WHERE 1=1 ${filter}
      GROUP BY diagnosis
    `, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil laporan", error: err.message });
  }
});

module.exports = router;
