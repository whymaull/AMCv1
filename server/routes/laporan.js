const express = require("express");
const router = express.Router();
const db = require("../db");

// 1. Statistik Diagnosa (dengan filter tanggal dan mekanik)
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

// 1b. Statistik Diagnosa Default (tanpa filter)
router.get("/statistik-default", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT diagnosis, COUNT(*) AS jumlah
      FROM riwayat_diagnosa
      GROUP BY diagnosis
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data statistik" });
  }
});

// 2. Riwayat Diagnosa
router.get("/riwayat", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.nama_pelanggan, r.jenis_motor, r.diagnosis, r.waktu, m.nama AS nama_mekanik
      FROM riwayat_diagnosa r
      LEFT JOIN mekanik m ON r.id_mekanik = m.id
      ORDER BY r.waktu DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data riwayat" });
  }
});

// 3. Frekuensi Gejala
router.get("/gejala", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT g.deskripsi, COUNT(rg.id_gejala) AS jumlah
      FROM riwayat_gejala rg
      JOIN gejala g ON rg.id_gejala = g.id_gejala
      GROUP BY g.deskripsi
      ORDER BY jumlah DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data gejala" });
  }
});

// 4. Performa Mekanik
router.get("/mekanik", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.nama, COUNT(r.id_riwayat) AS jumlah
      FROM riwayat_diagnosa r
      JOIN mekanik m ON r.id_mekanik = m.id
      GROUP BY m.nama
      ORDER BY jumlah DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data mekanik" });
  }
});

module.exports = router;
