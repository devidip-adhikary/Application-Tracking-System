const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  getOpenings,
  addOpenings,
} = require("../controllers/openingController");
const router = express.Router();

/**
 * @swagger
 * /api/opening:
 *   get:
 *     summary: "Get all openings"
 *     tags: [Opening]
 *     description: "Retrieve a list of openings"
 *     responses:
 *       200:
 *         description: "Successfully retrieved openings"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/", authenticate, getOpenings);

/**
 * @swagger
 * /api/opening:
 *   post:
 *     summary: Add a new job opening
 *     description: Creates a new job opening if a duplicate does not exist based on client and tech stack.
 *     tags: [Opening]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the job opening.
 *                 example: "Software Engineer"
 *               client:
 *                 type: integer
 *                 description: ID of the client.
 *                 example: 14
 *               tech:
 *                 type: integer
 *                 description: ID of the tech stack.
 *                 example: 1
 *               job_description:
 *                 type: string
 *                 description: Description of the job.
 *                 example: "Responsible for developing web applications."
 *               location:
 *                 type: string
 *                 description: Location of the job.
 *                 example: "New York, NY"
 *               number_of_requiremnts:
 *                 type: integer
 *                 description: Number of positions available.
 *                 example: 5
 *               work_mode:
 *                 type: string
 *                 description: Work mode (e.g., remote, onsite).
 *                 example: "remote"
 *     responses:
 *       201:
 *         description: Job opening created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Opening'
 *       409:
 *         description: Duplicate record found with the same requirement.
 *       500:
 *         description: Server error.
 */
router.post("/", authenticate, addOpenings);

module.exports = router;
