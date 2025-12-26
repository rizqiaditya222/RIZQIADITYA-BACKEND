const ApiResponse = require('../utils/apiResponse');
const StatisticService = require('../services/statisticService');

class StatisticController {
  static async getTodayStatistic(req, res, next) {
    try {
      const stat = await StatisticService.getTodayStatistic();
      return ApiResponse.success(res, stat, 'Today statistic retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async getStatisticRange(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      const stats = await StatisticService.getStatisticsByDateRange(
        new Date(startDate),
        new Date(endDate)
      );

      return ApiResponse.success(res, stats, 'Statistics retrieved');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StatisticController;
