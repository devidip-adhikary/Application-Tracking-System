const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  getClients,
  editClient,
  addClients,
  deleteClient,
} = require("../controllers/clientController");
const router = express.Router();

/**
 * @swagger
 * /api/client:
 *   get:
 *     summary: "Get all clients"
 *     tags: [Client]
 *     description: "Retrieve a list of clients"
 *     responses:
 *       200:
 *         description: "Successfully retrieved clients"
 *       401:
 *         description: "Unauthorized"
 *     security:
 *       - bearerAuth: []  # This line ensures the route requires JWT authentication
 */
router.get("/", authenticate, getClients);
router.post("/", authenticate, addClients);
router.put("/", authenticate, editClient);
router.delete("/:id", authenticate, deleteClient);

module.exports = router;
