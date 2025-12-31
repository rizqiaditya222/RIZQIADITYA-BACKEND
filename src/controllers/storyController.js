const Story = require('../models/Story');
const Comment = require('../models/Comment');
const ApiResponse = require('../utils/apiResponse');
const FileService = require('../services/fileService');

class StoryController {
  static async getAllStories(req, res, next) {
    try {
      const stories = await Story.find({ isVisible: true })
        .populate('comments')
        .sort({ createdAt: -1 });

      return ApiResponse.success(res, stories, 'Stories retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getStoryById(req, res, next) {
    try {
      const story = await Story.findById(req.params.id).populate('comments');

      if (!story) {
        return ApiResponse.error(res, 'Story not found', 404);
      }

      return ApiResponse.success(res, story, 'Story retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createStory(req, res, next) {
    try {
      if (!req.file) {
        return ApiResponse.error(res, 'Photo is required', 400);
      }

      const photoUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

      const story = await Story.create({
        caption: req.body.caption || null,
        photoUrl,
        location: req.body.location || '',
        expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam dari sekarang
      });

      return ApiResponse.created(res, story, 'Story created successfully');
    } catch (error) {
      next(error);
    }
  }


  static async deleteStory(req, res, next) {
    try {
      const story = await Story.findById(req.params.id);

      if (!story) {
        return ApiResponse.error(res, 'Story not found', 404);
      }

      await Comment.deleteMany({ storyId: story._id });

      await FileService.deleteFile(story.photoUrl);

      await story.deleteOne();

      return ApiResponse.success(res, null, 'Story deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getArchivedStories(req, res, next) {
    try {
      const stories = await Story.find({ isVisible: false })
        .sort({ createdAt: -1 });

      return ApiResponse.success(res, stories, 'Archived stories retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StoryController;