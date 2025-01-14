const express = require("express");
const { getCandidates } = require("../controllers/candidateController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

/**
 * @swagger
 * /api/candidate:
 *   get:
 *     summary: "Get all candidates"
 *     tags: [Candidate]
 *     description: "Retrieve a list of candidates"
 *     responses:
 *       200:
 *         description: "Successfully retrieved candidates"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/", authenticate, getCandidates);

module.exports = router;
