const db = require("../db");

module.exports = {
  async getDiagnosisByGejala(gejalaList) {
    const placeholders = gejalaList.map(() => '?').join(',');
    const [rows] = await db.query(`
      SELECT d.nama_kerusakan, COUNT(*) as total
      FROM rulebase rb
      JOIN diagnosis d ON rb.id_diagnosis = d.id_diagnosis
      WHERE rb.id_gejala IN (${placeholders})
      GROUP BY d.id_diagnosis
      ORDER BY total DESC
      LIMIT 1
    `, gejalaList);

    return rows.length > 0 ? rows[0].nama_kerusakan : "Tidak ditemukan";
  }
};
