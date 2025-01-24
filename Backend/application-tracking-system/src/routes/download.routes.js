const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { downloadResume } = require("../controllers/downloadController");

const router = express.Router();
router.get("/resume/:id", authenticate, downloadResume);
module.exports = router;
