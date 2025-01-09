const express = require('express');
const multer = require('multer');
const { uploadMasterData } = require('../controllers/uploadController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload Master Data
 *     description: Upload master data from an Excel file
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Data uploaded successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * tags:
 *   - Upload
 */
router.post('/',authenticate, upload.single('file'), uploadMasterData);

module.exports = router;