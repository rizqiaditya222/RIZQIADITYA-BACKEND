const express = require('express');
const MessageController = require('../controllers/messageController');

const router = express.Router();

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send message
 *     description: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *                 description: Message content
 *                 example: "Halo Rizqi 👋"
 *           examples:
 *             example1:
 *               summary: Simple message
 *               value:
 *                 message: "Halo Rizqi 👋"
 *             example2:
 *               summary: Longer message
 *               value:
 *                 message: "Hi! I really love your portfolio website. Great work!"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Message sent successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Message sent successfully"
 *                   data:
 *                     _id: "66abc123"
 *                     message: "Halo Rizqi 👋"
 *                     createdAt: "2025-12-27T11:00:00Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Validation Error"
 *               errors: ["message is required"]
 */
router.post('/', MessageController.createMessage);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve all messages sorted by newest first
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Messages retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Messages retrieved successfully"
 *                   data:
 *                     - _id: "66abc123"
 *                       message: "Halo Rizqi 👋"
 *                       createdAt: "2025-12-27T11:00:00Z"
 *                     - _id: "66abc122"
 *                       message: "Great portfolio!"
 *                       createdAt: "2025-12-27T10:30:00Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/', MessageController.getMessages);

module.exports = router;