const express = require("express");
const {
  getUsers,
  addUser,
  editUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: "Get all users"
 *     tags: [Users]
 *     description: "Retrieve a list of users"
 *     responses:
 *       200:
 *         description: "Successfully retrieved users"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/", authenticate, getUsers);
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
router.post("/", authenticate, addUser);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user's information
 *     description: Edit user details such as name, email, role, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the user to update
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: New name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: New email of the user
 *                 example: john.doe@example.com
 *               role:
 *                 type: string
 *                 description: New role of the user
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: New password for the user
 *                 example: password123
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
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
 *         description: Error updating user
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
router.put("/", authenticate, editUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetch a single user by their ID from the database.
 *     tags:
 *       - Users
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
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
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
router.get("/:id", authenticate, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Mark a user as inactive
 *     description: Perform a soft delete on a user by setting their `isActive` status to false.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to mark as inactive
 *     responses:
 *       200:
 *         description: User marked as inactive successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User marked as inactive successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Server Error
 */
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
