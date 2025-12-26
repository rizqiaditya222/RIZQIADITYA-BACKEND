const express = require('express');
const storyRoutes = require('./storyRoutes');
const commentRoutes = require('./commentRoutes');
const projectRoutes = require('./projectRoutes');
const messageRoutes = require('./messageRoutes');
const statisticRoutes = require('./statisticRoutes');

const router = express.Router();

router.use('/stories', storyRoutes);
router.use('/comments', commentRoutes);
router.use('/projects', projectRoutes);
router.use('/messages', messageRoutes);
router.use('/statistics', statisticRoutes);

module.exports = router;