const bcrypt = require("bcrypt");  // Tambahkan bcrypt untuk hashing password
const AuthModel = require("../models/AuthModel");

const AuthController = {
  // Register
  register: async (req, res) => {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: "Lengkapi semua field!" });
    }

    try {
      const user = await AuthModel.findByEmail(email);
      if (user) {
        return res.status(409).json({ message: "Email sudah terdaftar." });
      }

      // Hash password sebelum disimpan ke database
      const hashedPassword = await bcrypt.hash(password, 10);

      await AuthModel.register({ nama, email, password: hashedPassword });
      res.status(201).json({ message: "Registrasi berhasil." });

    } catch (err) {
      res.status(500).json({ message: "Gagal mendaftar.", error: err.message });
    }
  },

  // Login
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const mekanik = await AuthModel.findByEmail(email);
      if (!mekanik) {
        return res.status(401).json({ message: "Email tidak ditemukan." });
      }

      // Bandingkan password yang dimasukkan dengan hash password yang ada di database
      const isPasswordValid = await bcrypt.compare(password, mekanik.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password salah." });
      }

      // Jika login berhasil, simpan data user di session
      req.session.mekanik = {
        id: mekanik.id,
        nama: mekanik.nama,
        email: mekanik.email
      };

      res.json({
        message: "Login berhasil.",
        user: req.session.mekanik
      });

    } catch (err) {
      res.status(500).json({ message: "Login gagal.", error: err.message });
    }
  },

  // Menampilkan data user yang sedang login
  me: (req, res) => {
    if (!req.session.mekanik) {
      return res.status(401).json({ message: "Belum login." });
    }
    res.json(req.session.mekanik);
  },

  // Logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Gagal logout" });
      }
      // Setelah session dihancurkan, arahkan ke halaman login
      res.redirect("/login.html"); // Arahkan ke login setelah logout
    });
  }
};

module.exports = AuthController;
