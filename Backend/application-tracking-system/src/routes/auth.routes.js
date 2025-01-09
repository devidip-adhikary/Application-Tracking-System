const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: "Login"
 *     description: "Login to get a JWT token."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "devidip.adhikary@protivitiglobal.in"  # Default example email
 *               password:
 *                 type: string
 *                 example: "pro@1234"  # Default example email
 *     responses:
 *       200:
 *         description: "Successfully logged in, token returned."
 *       400:
 *         description: "Invalid credentials"
 */
router.post('/login', login);

module.exports = router;
