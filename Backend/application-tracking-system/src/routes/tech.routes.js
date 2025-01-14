const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { getTechList } = require("../controllers/techController");
const router = express.Router();

/**
 * @swagger
 * /api/tech:
 *   get:
 *     summary: "Get all tech stacks"
 *     tags: [Tech Stack]
 *     description: "Retrieve a list of tech stacks"
 *     responses:
 *       200:
 *         description: "Successfully retrieved tech stacks"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/", authenticate, getTechList);

module.exports = router;
