const cron = require('node-cron');
const Story = require('../models/Story');
const Statistic = require('../models/Statistic');

const archiveExpiredStories = async () => {
  try {
    const now = new Date();
    const result = await Story.updateMany(
      {
        isVisible: true,
        expiredAt: { $lte: now },
      },
      {
        $set: { isVisible: false },
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log(`Archived ${result.modifiedCount} expired stories`);
    }
  } catch (error) {
    console.error('Error archiving stories:', error);
  }
};

const resetDailyStatistics = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Statistic.findOneAndUpdate(
      { date: today },
      {
        date: today,
        todayVisit: 0,
        todayComment: 0,
        todayMessage: 0,
      },
      { upsert: true, new: true }
    );

    console.log('Daily statistics reset successfully');
  } catch (error) {
    console.error('Error resetting statistics:', error);
  }
};

const startCronJobs = () => {
  cron.schedule('0 * * * *', archiveExpiredStories);

  cron.schedule('0 0 * * *', resetDailyStatistics);

  console.log('Cron jobs started');
};

module.exports = {
  startCronJobs,
  archiveExpiredStories,
  resetDailyStatistics,
};