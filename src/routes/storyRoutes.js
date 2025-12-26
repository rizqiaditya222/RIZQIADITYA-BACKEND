const express = require('express');
const StoryController = require('../controllers/storyController');
const upload = require('../config/multer');
const validate = require('../middlewares/validation');
const { createStoryValidator } = require('../validators/storyValidator');

const router = express.Router();

/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get all visible stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: Stories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Story'
 */
router.get('/', StoryController.getAllStories);

/**
 * @swagger
 * /api/stories/archive:
 *   get:
 *     summary: Get archived stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: Archived stories retrieved successfully
 */
router.get('/archive', StoryController.getArchivedStories);

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get story by ID
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story retrieved successfully
 *       404:
 *         description: Story not found
 */
router.get('/:id', StoryController.getStoryById);

/**
 * @swagger
 * /api/stories:
 *   post:
 *     summary: Create new story
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               location:
 *                 type: string
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Story created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', upload.single('photo'), validate(createStoryValidator), StoryController.createStory);

/**
 * @swagger
 * /api/stories/{id}:
 *   delete:
 *     summary: Delete story
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story deleted successfully
 *       404:
 *         description: Story not found
 */
router.delete('/:id', StoryController.deleteStory);

module.exports = router;