const Statistic = require('../models/Statistic');

class StatisticService {
  static async getTodayStatistic() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let stat = await Statistic.findOne({ date: today });

    if (!stat) {
      stat = await Statistic.create({
        date: today,
        todayVisit: 0,
        todayComment: 0,
        todayMessage: 0,
      });
    }

    return stat;
  }

  static async incrementTodayVisit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stat = await Statistic.findOneAndUpdate(
      { date: today },
      {
        $inc: { todayVisit: 1 },
      },
      { upsert: true, new: true }
    );

    return stat;
  }

  static async incrementTodayComment() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stat = await Statistic.findOneAndUpdate(
      { date: today },
      {
        $inc: { todayComment: 1 },
      },
      { upsert: true, new: true }
    );

    return stat;
  }

  static async incrementTodayMessage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stat = await Statistic.findOneAndUpdate(
      { date: today },
      {
        $inc: { todayMessage: 1 },
      },
      { upsert: true, new: true }
    );

    return stat;
  }

  static async getStatisticsByDateRange(startDate, endDate) {
    return await Statistic.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: -1 });
  }
}

module.exports = StatisticService;