const express = require("express");
const {
  getCandidates,
  addCandidate,
  getCandidateById,
  editCandidate,
  deleteCandidate,
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
 * /api/candidate/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetch a single user by their ID from the database.
 *     tags: [Candidate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error fetching user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */
router.get("/:id", authenticate, getCandidateById);

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

/**
 * @swagger
 * /api/candidate:
 *   put:
 *     summary: Edit an existing candidate
 *     description: Update the details of an existing candidate using their ID.
 *     tags: [Candidate]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: id
 *         type: integer
 *         required: true
 *         description: ID of the candidate to be updated.
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the candidate.
 *       - in: formData
 *         name: email
 *         type: string
 *         description: Email address of the candidate.
 *       - in: formData
 *         name: ph_no
 *         type: string
 *         description: Phone number of the candidate.
 *       - in: formData
 *         name: current_company
 *         type: string
 *         description: Current company of the candidate.
 *       - in: formData
 *         name: YOE
 *         type: integer
 *         description: Years of experience of the candidate.
 *       - in: formData
 *         name: RYOE
 *         type: integer
 *         description: Relevant years of experience of the candidate.
 *       - in: formData
 *         name: notice_period
 *         type: integer
 *         description: Notice period of the candidate.
 *       - in: formData
 *         name: cur_location
 *         type: string
 *         description: Current location of the candidate.
 *       - in: formData
 *         name: pref_location
 *         type: string
 *         description: Preferred location of the candidate.
 *       - in: formData
 *         name: current_ctc
 *         type: number
 *         format: float
 *         description: Current CTC of the candidate.
 *       - in: formData
 *         name: expected_ctc
 *         type: number
 *         format: float
 *         description: Expected CTC of the candidate.
 *       - in: formData
 *         name: lwd
 *         type: string
 *         format: date
 *         description: Last working day of the candidate.
 *       - in: formData
 *         name: opening
 *         type: integer
 *         description: Opening ID related to the candidate.
 *       - in: formData
 *         name: vendor_id
 *         type: integer
 *         description: Vendor ID associated with the candidate.
 *       - in: formData
 *         name: opening_id
 *         type: integer
 *         description: OpeningVsCandidates ID to be updated.
 *       - in: formData
 *         name: resume
 *         type: file
 *         description: Resume file of the candidate.
 *     responses:
 *       200:
 *         description: Successfully updated the candidate.
 *         schema:
 *           $ref: '#/definitions/Candidate'
 *       404:
 *         description: Candidate not found.
 *       500:
 *         description: Error updating the candidate.
 */
router.put("/", upload.single("resume"), authenticate, editCandidate);

/**
 * @swagger
 * /api/candidate/{id}:
 *   delete:
 *     summary: Delete an existing candidate
 *     description: Soft delete an existing candidate by marking them as inactive.
 *     tags: [Candidate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User marked as inactive successfully
 *     responses:
 *       200:
 *         description: Candidate marked as inactive successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Candidate marked as inactive successfully
 *       404:
 *         description: Candidate not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Candidate not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Server Error
 */
router.delete("/:id", authenticate, deleteCandidate);

module.exports = router;
