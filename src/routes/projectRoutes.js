const express = require('express');
const ProjectController = require('../controllers/projectController');
const upload = require('../config/multer');

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve all projects sorted by newest first
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Projects retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Projects retrieved successfully"
 *                   data:
 *                     - _id: "66proj123"
 *                       photoUrl: "uploads/project-1.png"
 *                       title: "My Portfolio App"
 *                       description: "A short description of the project"
 *                       githubRepos:
 *                         - repoName: "portfolio-backend"
 *                           repoUrl: "https://github.com/rizqi/portfolio"
 *                       deploymentUrl: "https://portfolio.rizqiaditya.com"
 *                       techStack: ["Node.js", "Express", "MongoDB"]
 *                       createdAt: "2025-01-27T12:00:00Z"
 */
router.get('/', ProjectController.getAllProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create new project
 *     description: Create a new project with photo upload
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
 *                 description: Project photo/screenshot
 *               title:
 *                 type: string
 *                 description: Project title
 *                 example: "My Portfolio App"
 *               description:
 *                 type: string
 *                 description: Project description
 *                 example: "A short description of the project"
 *               githubRepos:
 *                 type: string
 *                 description: JSON stringified array of GitHub repositories
 *                 example: '[{"repoName":"portfolio-backend","repoUrl":"https://github.com/rizqi/portfolio"}]'
 *               deploymentUrl:
 *                 type: string
 *                 description: Live deployment URL
 *                 example: "https://portfolio.rizqiaditya.com"
 *               techStack:
 *                 type: string
 *                 description: JSON stringified array of technologies
 *                 example: '["Node.js","Express","MongoDB"]'
 *           encoding:
 *             photo:
 *               contentType: image/png, image/jpeg, image/jpg
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Project created successfully"
 *                   data:
 *                     _id: "66proj123"
 *                     photoUrl: "uploads/project-1234567890.png"
 *                     title: "My Portfolio App"
 *                     description: "A short description of the project"
 *                     githubRepos:
 *                       - repoName: "portfolio-backend"
 *                         repoUrl: "https://github.com/rizqi/portfolio"
 *                     deploymentUrl: "https://portfolio.rizqiaditya.com"
 *                     techStack: ["Node.js", "Express", "MongoDB"]
 *                     createdAt: "2025-01-27T12:00:00Z"
 *       400:
 *         description: Validation error or missing photo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             examples:
 *               missing_photo:
 *                 summary: Photo is required
 *                 value:
 *                   success: false
 *                   message: "Photo is required"
 */
router.post('/', upload.single('photo'), ProjectController.createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Retrieve a single project by its ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *         example: "66proj123"
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Project retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.get('/:id', ProjectController.getProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     description: Update an existing project (photo is optional)
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to update
 *         schema:
 *           type: string
 *         example: "66proj123"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: New project photo (optional)
 *               title:
 *                 type: string
 *                 description: Project title
 *                 example: "Updated Portfolio App"
 *               description:
 *                 type: string
 *                 description: Project description
 *                 example: "Updated description of the project"
 *               githubRepos:
 *                 type: string
 *                 description: JSON stringified array of GitHub repositories
 *                 example: '[{"repoName":"portfolio-v2","repoUrl":"https://github.com/rizqi/portfolio-v2"}]'
 *               deploymentUrl:
 *                 type: string
 *                 description: Live deployment URL
 *                 example: "https://portfolio-v2.rizqiaditya.com"
 *               techStack:
 *                 type: string
 *                 description: JSON stringified array of technologies
 *                 example: '["Node.js","Express","MongoDB","Redis"]'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Project updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   message: "Project updated successfully"
 *                   data:
 *                     _id: "66proj123"
 *                     photoUrl: "uploads/project-updated.png"
 *                     title: "Updated Portfolio App"
 *                     description: "Updated description of the project"
 *                     githubRepos:
 *                       - repoName: "portfolio-v2"
 *                         repoUrl: "https://github.com/rizqi/portfolio-v2"
 *                     deploymentUrl: "https://portfolio-v2.rizqiaditya.com"
 *                     techStack: ["Node.js", "Express", "MongoDB", "Redis"]
 *                     createdAt: "2025-01-27T12:00:00Z"
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Project not found"
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.put('/:id', upload.single('photo'), ProjectController.updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     description: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to delete
 *         schema:
 *           type: string
 *         example: "66proj123"
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Project deleted successfully"
 *                 data:
 *                   type: null
 *                   example: null
 *             example:
 *               success: true
 *               message: "Project deleted successfully"
 *               data: null
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 *             example:
 *               success: false
 *               message: "Project not found"
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseError'
 */
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;