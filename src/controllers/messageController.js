const Message = require('../models/Message');
const ApiResponse = require('../utils/apiResponse');
const StatisticService = require('../services/statisticService');

class MessageController {
  static async createMessage(req, res, next) {
    try {
      const message = await Message.create({
        message: req.body.message,
      });

      await StatisticService.incrementTodayMessage();

      return ApiResponse.created(res, message, 'Message sent successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getMessages(req, res, next) {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      return ApiResponse.success(res, messages, 'Messages retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;
