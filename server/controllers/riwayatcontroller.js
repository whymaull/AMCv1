// const RiwayatModel = require("../models/riwayatmodel");

// const RiwayatController = {
  
//   getStatistik: (req, res) => {
//     RiwayatModel.getStatistik((err, result) => {
//       if (err) return res.status(500).json({ message: "Gagal mengambil data." });
//       res.json(result);
//     });
//   },

//   simpanRiwayat: (req, res) => {
//     const mekanik = req.session.mekanik;
//     if (!mekanik) {
//       return res.status(401).json({ message: "Belum login" });
//     }

//     const { nama_pelanggan, jenis_motor, nomor_plat, gejala, hasil } = req.body;

//     if (!nama_pelanggan || !jenis_motor || !nomor_plat || !gejala || !hasil) {
//       return res.status(400).json({ message: "Semua data wajib diisi" });
//     }

//     RiwayatModel.simpanRiwayat(
//       {
//         nama_pelanggan,
//         jenis_motor,
//         nomor_plat,
//         gejala,
//         hasil,
//         id_mekanik: mekanik.id
//       },
//       (err, result) => {
//         if (err) return res.status(500).json({ message: "Gagal menyimpan riwayat" });
//         res.json({ message: "Riwayat berhasil disimpan" });
//       }
//     );
//   },

//   getRiwayat: (req, res) => {
//   const mekanik = req.session.mekanik;
//   if (!mekanik) {
//     return res.status(401).json({ message: "Belum login" });
//   }

//   RiwayatModel.getRiwayatByMekanik(mekanik.id, (err, result) => {
//     if (err) return res.status(500).json({ message: "Gagal mengambil riwayat" });

//       const cleaned = result.map(item => ({
//         ...item,
//         gejala: JSON.parse(item.gejala)
//       }));

//       res.json(cleaned);
//     });
//   }

// };

// module.exports = RiwayatController;