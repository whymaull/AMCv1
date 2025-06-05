const AuthModel = require("../models/AuthModel");

const AuthController = {
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

      await AuthModel.register({ nama, email, password });
      res.status(201).json({ message: "Registrasi berhasil." });

    } catch (err) {
      res.status(500).json({ message: "Gagal mendaftar.", error: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const mekanik = await AuthModel.findByEmail(email);
      if (!mekanik) {
        return res.status(401).json({ message: "Email tidak ditemukan." });
      }

      if (mekanik.password !== password) {
        return res.status(401).json({ message: "Password salah." });
      }

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

  me: (req, res) => {
    if (!req.session.mekanik) {
      return res.status(401).json({ message: "Belum login." });
    }
    res.json(req.session.mekanik);
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Berhasil logout." });
    });
  }
};

module.exports = AuthController;
