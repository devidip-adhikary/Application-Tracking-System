const express = require("express");
const {
  getCandidates,
  addCandidate,
} = require("../controllers/candidateController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

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

/**
 * @swagger
 * /api/candidate:
 *   post:
 *     summary: Add a new candidate
 *     tags: [Candidate]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               ph_no:
 *                 type: string
 *               vendor_id:
 *                  type: number
 *               opening:
 *                  type: number
 *               current_company:
 *                 type: string
 *               YOE:
 *                 type: integer
 *               RYOE:
 *                 type: integer
 *               notice_period:
 *                 type: string
 *               cur_location:
 *                 type: string
 *               pref_location:
 *                 type: string
 *               current_ctc:
 *                 type: number
 *                 format: float
 *               expected_ctc:
 *                 type: number
 *                 format: float
 *               resume:
 *                 type: string
 *                 format: binary
 *               lwd:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Candidate added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       400:
 *         description: Bad request
 */
router.post("/", upload.single("resume"), authenticate, addCandidate);

module.exports = router;
