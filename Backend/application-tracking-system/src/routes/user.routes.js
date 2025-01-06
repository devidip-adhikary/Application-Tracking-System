const express = require('express');
const { getUsers, addUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: "Get all users"
 *     description: "Retrieve a list of users"
 *     responses:
 *       200:
 *         description: "Successfully retrieved users"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get('/', authenticate, getUsers);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/', addUser);

module.exports = router;
