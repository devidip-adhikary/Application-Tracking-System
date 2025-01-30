const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  getStatus,
  getTechList,
} = require("../controllers/masterDataController");
const router = express.Router();

/**
 * @swagger
 * /api/data/status:
 *   get:
 *     summary: "Get all status"
 *     tags: [Master Data]
 *     description: "Retrieve a list of status"
 *     responses:
 *       200:
 *         description: "Successfully retrieved status"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/status", authenticate, getStatus);

/**
 * @swagger
 * /api/data/tech:
 *   get:
 *     summary: "Get all tech stacks"
 *     tags: [Master Data]
 *     description: "Retrieve a list of tech stacks"
 *     responses:
 *       200:
 *         description: "Successfully retrieved tech stacks"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/tech", authenticate, getTechList);

module.exports = router;
