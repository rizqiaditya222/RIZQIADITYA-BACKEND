const statisticService = require('../services/statisticService');

const trackVisit = async (req, res, next) => {
  if (req.path.startsWith('/api/') && req.method === 'GET') {
    try {
      await statisticService.incrementTodayVisit();
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  }
  next();
};

module.exports = trackVisit;