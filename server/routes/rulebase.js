const express = require("express");
const router = express.Router();
const RulebaseModel = require("../models/rulebasemodel");

router.post("/diagnosis", async (req, res) => {
  const { gejala } = req.body;
  if (!gejala || gejala.length === 0) {
    return res.status(400).json({ message: "Data gejala kosong" });
  }

  try {
    const diagnosis = await RulebaseModel.getDiagnosisByGejala(gejala);
    res.json({ diagnosis });
  } catch (err) {
    res.status(500).json({ message: "Gagal mendiagnosis", error: err.message });
  }
});

module.exports = router;
