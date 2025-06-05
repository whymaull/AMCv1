const db = require("../db");

module.exports = {
  	async simpanRiwayat(data) {
		const { nama, motor, plat, mekanik_id, gejala, diagnosis, waktu } = data;

		// Konversi waktu ke format MySQL: YYYY-MM-DD HH:MM:SS
		const waktuFormatted = new Date(waktu).toISOString().slice(0, 19).replace('T', ' ');

		// Simpan data pelanggan dan diagnosis ke tabel riwayat_diagnosa
		const [result] = await db.query(`
		INSERT INTO riwayat_diagnosa (nama_pelanggan, jenis_motor, plat_nomor, diagnosis, id_mekanik, waktu)
		VALUES (?, ?, ?, ?, ?, ?)
		`, [nama, motor, plat, diagnosis, mekanik_id, waktuFormatted]);

		const id_riwayat = result.insertId;

		// Simpan semua gejala ke tabel riwayat_gejala
		for (let id_gejala of gejala) {
		await db.query(`
			INSERT INTO riwayat_gejala (id_riwayat, id_gejala)
			VALUES (?, ?)
		`, [id_riwayat, id_gejala]);
		}
  	},

    async getAllRiwayat() {
		try {
			console.log("📥 Mengambil semua riwayat diagnosa...");
			const [rows] = await db.query(`
			SELECT 
				r.id_riwayat, 
				r.nama_pelanggan, 
				r.jenis_motor, 
				r.plat_nomor, 
				r.diagnosis, 
				r.waktu, 
				m.nama AS nama_mekanik,
				GROUP_CONCAT(rg.id_gejala) AS gejala
			FROM riwayat_diagnosa r
			LEFT JOIN mekanik m ON r.id_mekanik = m.id
			LEFT JOIN riwayat_gejala rg ON r.id_riwayat = rg.id_riwayat
			GROUP BY r.id_riwayat
			ORDER BY r.waktu DESC
			`);
			return rows;
		} catch (error) {
			console.error("❌ Error saat mengambil riwayat diagnosa:", error.message);
			throw error;
		}
	}
};
