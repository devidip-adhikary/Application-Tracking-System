const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

const router = express.Router();

// Mount individual route files
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
