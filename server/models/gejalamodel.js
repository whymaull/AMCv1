const db = require("../db");

module.exports = {
  async getAllGejala() {
    const [rows] = await db.query("SELECT * FROM gejala");
    return rows;
  },

  async getGejalaAwal() {
    const [rows] = await db.query("SELECT * FROM gejala WHERE is_awal = 1");
    return rows;
  },

  async getGejalaPendukung(id_awal) {
    // Ambil diagnosis yang memiliki gejala awal tsb
    const [diagnosisRows] = await db.query(`
      SELECT DISTINCT id_diagnosis
      FROM rulebase
      WHERE id_gejala = ?
      AND is_gejala_awal = 1
    `, [id_awal]);

    if (diagnosisRows.length === 0) return [];

    const idDiagnosisList = diagnosisRows.map(row => row.id_diagnosis);

    // Ambil semua gejala dari diagnosis tersebut, selain gejala awal
    const [gejalaPendukung] = await db.query(`
      SELECT DISTINCT g.id_gejala AS id, g.deskripsi AS nama
      FROM rulebase rb
      JOIN gejala g ON rb.id_gejala = g.id_gejala
      WHERE rb.id_diagnosis IN (?)
      AND rb.id_gejala != ?
    `, [idDiagnosisList, id_awal]);

    return gejalaPendukung;
  }

};
