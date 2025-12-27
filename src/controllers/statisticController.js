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

      if (!startDate || !endDate) {
        return ApiResponse.error(res, 'startDate and endDate are required', 400);
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return ApiResponse.error(res, 'Invalid date format. Use YYYY-MM-DD', 400);
      }

      if (start > end) {
        return ApiResponse.error(res, 'startDate cannot be greater than endDate', 400);
      }

      const stats = await StatisticService.getStatisticsByDateRange(start, end);

      return ApiResponse.success(res, stats, 'Statistics retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async incrementVisit(req, res, next) {
    try {
      const stat = await StatisticService.incrementTodayVisit();
      return ApiResponse.success(res, stat, 'Visit count incremented');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StatisticController;