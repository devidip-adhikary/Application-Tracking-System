const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  getOpeningsVScandidate,
  getDashboardStat,
} = require("../controllers/openingVScandidateController");
const router = express.Router();

/**
 * @swagger
 * /api/openings-vs-candidate:
 *   get:
 *     summary: Fetch all Openings Vs Candidates.
 *     description: Retrieves a list of all openings and their associated candidates, including related data for openings and clients.
 *     tags: [OpeningsVsCandidates]
 *     responses:
 *       200:
 *         description: A list of openings vs candidates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the OpeningVsCandidate entry.
 *                     example: 1
 *                   Opening:
 *                     type: object
 *                     description: Details of the associated opening.
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the opening.
 *                         example: 10
 *                       title:
 *                         type: string
 *                         description: The title of the opening.
 *                         example: Software Developer
 *                   Clients:
 *                     type: object
 *                     description: Details of the associated client.
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the client.
 *                         example: 5
 *                       name:
 *                         type: string
 *                         description: The name of the client.
 *                         example: Acme Corp
 *       500:
 *         description: Server error.
 */

router.get("/", authenticate, getOpeningsVScandidate);

/**
 * @swagger
 * /api/openings-vs-candidate/{status}:
 *   get:
 *     summary: Get the count of records for a specific status in opening_vs_candidate table.
 *     tags: [OpeningsVsCandidates]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the status (case-insensitive).
 *     responses:
 *       200:
 *         description: Successfully fetched the count of records.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_name:
 *                   type: string
 *                   description: The status name provided in the request.
 *                   example: Rejected
 *                 count:
 *                   type: integer
 *                   description: Number of records for the given status.
 *                   example: 10
 *       400:
 *         description: Bad request, missing or invalid parameters.
 *       404:
 *         description: Status not found in the database.
 *       500:
 *         description: Internal server error.
 */
router.get("/:status", authenticate, getDashboardStat);

module.exports = router;
