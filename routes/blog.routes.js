/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 */

const express = require('express');
const {
  createBlog,
  getPublishedBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} = require('../controllers/blog.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get published blogs (public)
 *     tags: [Blogs]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *       - name: author
 *         in: query
 *         schema:
 *           type: string
 *       - name: title
 *         in: query
 *         schema:
 *           type: string
 *       - name: tags
 *         in: query
 *         schema:
 *           type: string
 *       - name: order_by
 *         in: query
 *         schema:
 *           type: string
 *           enum: [read_count, reading_time, createdAt]
 *     responses:
 *       200:
 *         description: List of published blogs
 */
router.get('/', getPublishedBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single published blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog found
 *       404:
 *         description: Blog not found
 */
router.get('/:id', getSingleBlog);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog (requires auth)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created in draft state
 */
router.post('/', protect, createBlog);

/**
 * @swagger
 * /api/blogs/my/blogs:
 *   get:
 *     summary: Get current user's blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: state
 *         in: query
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *     responses:
 *       200:
 *         description: List of user's blogs
 */
router.get('/my/blogs', protect, getMyBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog (must be owner)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               body:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [draft, published]
 *     responses:
 *       200:
 *         description: Blog updated
 *       403:
 *         description: Unauthorized
 */
router.put('/:id', protect, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog (must be owner)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted
 *       403:
 *         description: Unauthorized
 */
router.delete('/:id', protect, deleteBlog);

module.exports = router;
