const express = require('express');
const ProjectController = require('../controllers/projectController');
const upload = require('../config/multer');

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */
router.get('/', ProjectController.getAllProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *               - title
 *               - techStack
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               githubRepos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     repoName:
 *                       type: string
 *                     repoUrl:
 *                       type: string
 *               deploymentUrl:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post('/', upload.single('photo'), ProjectController.createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
