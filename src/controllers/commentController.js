const Comment = require('../models/Comment');
const Story = require('../models/Story');
const ApiResponse = require('../utils/apiResponse');
const StatisticService = require('../services/statisticService');

class CommentController {
  static async createComment(req, res, next) {
    try {
      const { storyId, comment } = req.body;

      const story = await Story.findById(storyId);
      if (!story) {
        return ApiResponse.error(res, 'Story not found', 404);
      }

      const newComment = await Comment.create({
        storyId,
        comment,
      });

      story.comments.push(newComment._id);
      await story.save();

      await StatisticService.incrementTodayComment();

      return ApiResponse.created(res, newComment, 'Comment added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getCommentsByStory(req, res, next) {
    try {
      const comments = await Comment.find({
        storyId: req.params.storyId,
      }).sort({ createdAt: -1 });

      return ApiResponse.success(res, comments, 'Comments retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return ApiResponse.error(res, 'Comment not found', 404);
      }

      await Story.findByIdAndUpdate(comment.storyId, {
        $pull: { comments: comment._id },
      });

      await comment.deleteOne();

      return ApiResponse.success(res, null, 'Comment deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
