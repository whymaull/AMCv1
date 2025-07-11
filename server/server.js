
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "pakar-secret",
  resave: false,
  saveUninitialized: true
}));

// Serve frontend static
app.use(express.static(path.join(__dirname, "..", "public")));

// Tes route awal
app.get("/api/ping", (req, res) => {
  res.send("✅ Backend aktif!");
});

const authRoutes = require("./routes/auth");
const riwayatRoutes = require("./routes/riwayat");
const gejalaRoutes = require("./routes/gejala");
const rulebaseRoutes = require("./routes/rulebase");
const laporanRoutes = require("./routes/laporan");
const mekanikRoutes = require("./routes/mekanik");
const diagnosisRoutes = require("./routes/diagnosis");

app.use("/api/auth", authRoutes);
app.use('/api/gejala', gejalaRoutes);
app.use("/api/rulebase", rulebaseRoutes);
app.use("/api/riwayat", riwayatRoutes);
app.use("/api/laporan", laporanRoutes);
app.use("/api/mekanik", mekanikRoutes);
app.use("/api/diagnosis", diagnosisRoutes);


app.use("/api", (req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
