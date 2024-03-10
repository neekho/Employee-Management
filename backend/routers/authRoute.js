const express = require("express");
const router = express.Router();

const loginLimiter = require("../middleware/loginLimiter");

const authController = require("../controllers/authController");

router.post("/login", loginLimiter, authController.login);

router.get("/refresh", authController.refresh);

router.post("/logout", authController.logout);

module.exports = router;
