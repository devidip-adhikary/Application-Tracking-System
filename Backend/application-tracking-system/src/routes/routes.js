const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const candidateRoutes = require("./candidate.routes");
const vendorRoutes = require("./vendor.routes");
const clientRoutes = require("./client.routes");
const openingRoutes = require("./opening.routes");
const uploadRoutes = require("./upload.routes");
const downloadRoutes = require("./download.routes");
const dataRoutes = require("./masterData.routes");
const openingVScandidate = require("./openingVScandidate.routes");

const router = express.Router();

// Mount individual route files
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/candidate", candidateRoutes);
router.use("/opening", openingRoutes);
router.use("/vendor", vendorRoutes);
router.use("/client", clientRoutes);
router.use("/upload", uploadRoutes);
router.use("/download", downloadRoutes);
router.use("/data", dataRoutes);
router.use("/openings-vs-candidate", openingVScandidate);

module.exports = router;
