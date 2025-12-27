const express = require('express');
const StatisticController = require('../controllers/statisticController');

const router = express.Router();

/**
 * @swagger
 * /api/statistics/today:
 *   get:
 *     summary: Get today statistics
 *     description: Retrieve statistics for the current day
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Today statistics retrieved successfully
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
 *                   example: "Today statistic retrieved"
 *                 data:
 *                   $ref: '#/components/schemas/Statistic'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Today statistic retrieved"
 *                   data:
 *                     date: "2025-12-27"
 *                     todayVisit: 120
 *                     todayComment: 10
 *                     todayMessage: 4
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/today', StatisticController.getTodayStatistic);

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Get statistics by date range
 *     description: Retrieve statistics for a specific date range
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Start date in YYYY-MM-DD format
 *         schema:
 *           type: string
 *           format: date
 *         example: "2025-12-01"
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: End date in YYYY-MM-DD format
 *         schema:
 *           type: string
 *           format: date
 *         example: "2025-12-27"
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
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
 *                   example: "Statistics retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Statistic'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Statistics retrieved"
 *                   data:
 *                     - date: "2025-12-27"
 *                       todayVisit: 120
 *                       todayComment: 10
 *                       todayMessage: 4
 *                     - date: "2025-12-26"
 *                       todayVisit: 95
 *                       todayComment: 8
 *                       todayMessage: 3
 *                     - date: "2025-12-25"
 *                       todayVisit: 110
 *                       todayComment: 12
 *                       todayMessage: 5
 *       400:
 *         description: Missing or invalid date parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "startDate and endDate are required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/', StatisticController.getStatisticRange);

/**
 * @swagger
 * /api/statistics/visit:
 *   post:
 *     summary: Increment today visit count
 *     description: Increment the visit counter for today's statistics. This should be called when a user visits the portfolio website.
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Visit count incremented successfully
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
 *                   example: "Visit count incremented"
 *                 data:
 *                   $ref: '#/components/schemas/Statistic'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Visit count incremented"
 *                   data:
 *                     date: "2025-12-27"
 *                     todayVisit: 121
 *                     todayComment: 10
 *                     todayMessage: 4
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.post('/visit', StatisticController.incrementVisit);

module.exports = router;