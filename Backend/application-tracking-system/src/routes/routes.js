const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const candidateRoutes = require("./candidate.routes");
const vendorRoutes = require("./vendor.routes");
const clientRoutes = require("./client.routes");
const openingRoutes = require("./opening.routes");
const techRoutes = require("./tech.routes");
const uploadRoutes = require("./upload.routes");

const router = express.Router();

// Mount individual route files
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/candidate", candidateRoutes);
router.use("/opening", openingRoutes);
router.use("/vendor", vendorRoutes);
router.use("/client", clientRoutes);
router.use("/tech", techRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
