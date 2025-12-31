const Project = require('../models/Project');
const ApiResponse = require('../utils/apiResponse');
const FileService = require('../services/fileService');

class ProjectController {
  static async getAllProjects(req, res, next) {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      return ApiResponse.success(res, projects, 'Projects retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createProject(req, res, next) {
    try {
      if (!req.file) {
        return ApiResponse.error(res, 'Photo is required', 400);
      }

      const project = await Project.create({
        photoUrl: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
        title: req.body.title,
        githubRepos: req.body.githubRepos || null,
        deploymentUrl: req.body.deploymentUrl || null,
        techStack: req.body.techStack,
      });

      return ApiResponse.created(res, project, 'Project created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return ApiResponse.error(res, 'Project not found', 404);
    }

    if (req.file) {
      await FileService.deleteFile(project.photoUrl);
      project.photoUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    if (req.body.title !== undefined) project.title = req.body.title;
    if (req.body.githubRepos !== undefined) project.githubRepos = req.body.githubRepos;
    if (req.body.deploymentUrl !== undefined) project.deploymentUrl = req.body.deploymentUrl;
    if (req.body.techStack !== undefined) project.techStack = req.body.techStack;

    await project.save();

    return ApiResponse.success(res, project, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
}


  static async deleteProject(req, res, next) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        return ApiResponse.error(res, 'Project not found', 404);
      }

      await FileService.deleteFile(project.photoUrl);
      await project.deleteOne();

      return ApiResponse.success(res, null, 'Project deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return ApiResponse.error(res, 'Project not found', 404);
    }

    return ApiResponse.success(res, project, 'Project retrieved successfully');
  } catch (error) {
    next(error);
  }
}
}



module.exports = ProjectController;
