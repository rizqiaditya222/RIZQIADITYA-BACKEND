const express = require('express');
const CommentController = require('../controllers/commentController');
const validate = require('../middlewares/validation');
const { createCommentValidator } = require('../validators/commentValidator');

const router = express.Router();

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create new comment
 *     description: Add a new comment to a story
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [storyId, comment]
 *             properties:
 *               storyId:
 *                 type: string
 *                 description: ID of the story to comment on
 *                 example: "65fab9998888"
 *               comment:
 *                 type: string
 *                 description: Comment text
 *                 example: "Keren banget 🔥"
 *           examples:
 *             example1:
 *               summary: Basic comment
 *               value:
 *                 storyId: "65fab9998888"
 *                 comment: "Keren banget 🔥"
 *     responses:
 *       201:
 *         description: Comment created successfully
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
 *                   example: "Comment added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Comment added successfully"
 *                   data:
 *                     _id: "65fabc123456"
 *                     storyId: "65fab9998888"
 *                     comment: "Keren banget 🔥"
 *                     createdAt: "2025-01-27T10:00:00Z"
 *       404:
 *         description: Story not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Story not found"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Validation Error"
 *               errors: ["storyId is required", "comment is required"]
 */
router.post('/', validate(createCommentValidator), CommentController.createComment);

/**
 * @swagger
 * /api/comments/story/{storyId}:
 *   get:
 *     summary: Get comments by story
 *     description: Retrieve all comments for a specific story
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         description: ID of the story
 *         schema:
 *           type: string
 *         example: "65fab9998888"
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
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
 *                   example: "Comments retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Comments retrieved successfully"
 *                   data:
 *                     - _id: "65fabc123456"
 *                       storyId: "65fab9998888"
 *                       comment: "Keren banget 🔥"
 *                       createdAt: "2025-01-27T10:00:00Z"
 *                     - _id: "65fabc123457"
 *                       storyId: "65fab9998888"
 *                       comment: "Mantap!"
 *                       createdAt: "2025-01-27T09:30:00Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/story/:storyId', CommentController.getCommentsByStory);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     description: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *         example: "65fabc123456"
 *     responses:
 *       200:
 *         description: Comment deleted successfully
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
 *                   example: "Comment deleted successfully"
 *                 data:
 *                   type: null
 *                   example: null
 *             example:
 *               success: true
 *               message: "Comment deleted successfully"
 *               data: null
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Comment not found"
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Invalid ID format"
 */
router.delete('/:id', CommentController.deleteComment);

module.exports = router;