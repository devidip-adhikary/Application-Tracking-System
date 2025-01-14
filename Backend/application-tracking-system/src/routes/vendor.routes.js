const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { getVendors } = require("../controllers/vendorController");
const router = express.Router();

/**
 * @swagger
 * /api/vendor:
 *   get:
 *     summary: "Get all vendors"
 *     tags: [Vendors]
 *     description: "Retrieve a list of vendors"
 *     responses:
 *       200:
 *         description: "Successfully retrieved vendors"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/", authenticate, getVendors);

module.exports = router;
