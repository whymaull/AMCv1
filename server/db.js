
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "", 
//   database: "amc"
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("✅ Terkoneksi ke database MySQL");
// });

// module.exports = db;


const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "amc",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
