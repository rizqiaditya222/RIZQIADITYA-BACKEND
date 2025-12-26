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
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - storyId
 *               - comment
 *             properties:
 *               storyId:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Story not found
 */
router.post('/', validate(createCommentValidator), CommentController.createComment);

/**
 * @swagger
 * /api/comments/story/{storyId}:
 *   get:
 *     summary: Get comments by story ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 */
router.get('/story/:storyId', CommentController.getCommentsByStory);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
