const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", AuthController.me);
router.get("/logout", AuthController.logout);

module.exports = router;
