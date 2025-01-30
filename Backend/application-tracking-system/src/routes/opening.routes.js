const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  getOpenings,
  addOpenings,
  editOpenings,
  deleteOpening,
  getOpeningById,
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
 * /api/opening/{id}:
 *   get:
 *     summary: Fetch an opening by ID
 *     description: Retrieves an opening based on the provided ID, including associated client and tech stack details.
 *     tags: [Opening]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the opening to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved opening details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 client:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 techStack:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *       404:
 *         description: Opening not found.
 *       500:
 *         description: Server error.
 */
router.get("/:id", authenticate, getOpeningById);

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

/**
 * @swagger
 * /api/opening:
 *   put:
 *     summary: Edit an existing opening
 *     description: Updates the details of an opening in the database using its ID.
 *     tags: [Opening]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the opening to be updated.
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Name of the opening.
 *                 example: Software Developer
 *               client:
 *                 type: string
 *                 description: Client associated with the opening.
 *                 example: TechCorp
 *               tech:
 *                 type: string
 *                 description: Technologies required for the opening.
 *                 example: JavaScript, React, Node.js
 *               job_description:
 *                 type: string
 *                 description: Description of the job.
 *                 example: Responsible for developing web applications.
 *               location:
 *                 type: string
 *                 description: Job location.
 *                 example: Remote
 *               number_of_requiremnts:
 *                 type: integer
 *                 description: Number of positions available.
 *                 example: 3
 *               work_mode:
 *                 type: string
 *                 description: Work mode (e.g., Onsite, Remote, Hybrid).
 *                 example: Hybrid
 *     responses:
 *       201:
 *         description: Successfully updated the opening.
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               description: Number of rows updated.
 *               example: 1
 *       500:
 *         description: Internal server error.
 */
router.put("/", authenticate, editOpenings);

/**
 * @swagger
 * /api/opening/{id}:
 *   delete:
 *     summary: Soft delete an opening
 *     description: Marks an opening as inactive by setting the `isActive` property to `false`.
 *     tags: [Opening]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the opening to be soft-deleted.
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully marked the opening as inactive.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Opening marked as inactive successfully
 *       404:
 *         description: Opening not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Opening not found
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", authenticate, deleteOpening);

module.exports = router;
