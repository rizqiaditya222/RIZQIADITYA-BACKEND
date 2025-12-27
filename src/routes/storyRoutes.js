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
 *     description: Retrieve all stories that are currently visible (not expired)
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Stories retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Story'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Stories retrieved successfully"
 *                   data:
 *                     - _id: "64f2c9b5d9a123456789abcd"
 *                       photoUrl: "https://cdn.rizqiaditya.com/stories/story-1.jpg"
 *                       caption: "pusink"
 *                       location: "Bali"
 *                       isVisible: true
 *                       expiredAt: "2025-12-28T12:00:00.000Z"
 *                       comments: []
 *                       createdAt: "2025-12-27T12:00:00.000Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/', StoryController.getAllStories);

/**
 * @swagger
 * /api/stories/archive:
 *   get:
 *     summary: Get archived stories
 *     description: Retrieve all stories that have expired and are no longer visible
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: Archived stories retrieved successfully
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
 *                   example: "Archived stories retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Story'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Archived stories retrieved successfully"
 *                   data:
 *                     - _id: "64f2c9b5d9a123456789abce"
 *                       photoUrl: "uploads/story-old.jpg"
 *                       caption: "Old story"
 *                       location: "Jakarta"
 *                       isVisible: false
 *                       expiredAt: "2025-12-20T12:00:00.000Z"
 *                       comments: []
 *                       createdAt: "2025-12-19T12:00:00.000Z"
 */
router.get('/archive', StoryController.getArchivedStories);

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get story by ID
 *     description: Retrieve a specific story with its comments
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the story
 *         schema:
 *           type: string
 *         example: "64f2c9b5d9a123456789abcd"
 *     responses:
 *       200:
 *         description: Story retrieved successfully
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
 *                   example: "Story retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Story'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Story retrieved successfully"
 *                   data:
 *                     _id: "64f2c9b5d9a123456789abcd"
 *                     photoUrl: "uploads/story-1.jpg"
 *                     caption: "pusink"
 *                     location: "Bali"
 *                     isVisible: true
 *                     expiredAt: "2025-12-28T12:00:00.000Z"
 *                     comments:
 *                       - _id: "65fabc123456"
 *                         storyId: "64f2c9b5d9a123456789abcd"
 *                         comment: "Keren banget 🔥"
 *                         createdAt: "2025-12-27T10:00:00Z"
 *                     createdAt: "2025-12-27T12:00:00.000Z"
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
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/:id', StoryController.getStoryById);

/**
 * @swagger
 * /api/stories:
 *   post:
 *     summary: Create new story
 *     description: Create a new story with photo upload
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [photo]
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Story photo/image
 *               caption:
 *                 type: string
 *                 description: Story caption (optional)
 *                 example: "So much going on lately"
 *               location:
 *                 type: string
 *                 description: Location where story was created (optional)
 *                 example: "Malang, Indonesia"
 *           encoding:
 *             photo:
 *               contentType: image/png, image/jpeg, image/jpg
 *           examples:
 *             with_caption:
 *               summary: Story with caption and location
 *               value:
 *                 photo: (binary)
 *                 caption: "So much going on lately"
 *                 location: "Malang, Indonesia"
 *             minimal:
 *               summary: Story with photo only
 *               value:
 *                 photo: (binary)
 *     responses:
 *       201:
 *         description: Story created successfully
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
 *                   example: "Story created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Story'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Story created successfully"
 *                   data:
 *                     _id: "64f2c9b5d9a123456789abcd"
 *                     photoUrl: "uploads/story-1234567890.jpg"
 *                     caption: "So much going on lately"
 *                     location: "Malang, Indonesia"
 *                     isVisible: true
 *                     expiredAt: "2025-12-28T12:00:00.000Z"
 *                     comments: []
 *                     createdAt: "2025-12-27T12:00:00.000Z"
 *       400:
 *         description: Validation error or missing photo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             examples:
 *               missing_photo:
 *                 summary: Photo is required
 *                 value:
 *                   success: false
 *                   message: "Photo is required"
 */
router.post(
  '/',
  upload.single('photo'),
  validate(createStoryValidator),
  StoryController.createStory
);

/**
 * @swagger
 * /api/stories/{id}:
 *   delete:
 *     summary: Delete story
 *     description: Delete a story and all its associated comments
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the story to delete
 *         schema:
 *           type: string
 *         example: "64f2c9b5d9a123456789abcd"
 *     responses:
 *       200:
 *         description: Story deleted successfully
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
 *                   example: "Story deleted successfully"
 *                 data:
 *                   type: null
 *                   example: null
 *             example:
 *               success: true
 *               message: "Story deleted successfully"
 *               data: null
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
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.delete('/:id', StoryController.deleteStory);

module.exports = router;