const db = require("../db");

const AuthModel = {
  register: async (data) => {
    const sql = `INSERT INTO mekanik (nama, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [data.nama, data.email, data.password]);
    return result;
  },

  findByEmail: async (email) => {
    const sql = `SELECT * FROM mekanik WHERE email = ? LIMIT 1`;
    const [rows] = await db.query(sql, [email]);
    return rows[0]; 
  }
};

module.exports = AuthModel;
