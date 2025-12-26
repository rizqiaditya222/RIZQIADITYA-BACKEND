const express = require('express');
const StatisticController = require('../controllers/statisticController');

const router = express.Router();

/**
 * @swagger
 * /api/statistics/today:
 *   get:
 *     summary: Get today statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Today statistics retrieved successfully
 */
router.get('/today', StatisticController.getTodayStatistic);

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Get statistics by date range
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
router.get('/', StatisticController.getStatisticRange);

module.exports = router;
