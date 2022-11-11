"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validation_1 = require("express-validation");
const blog_validation_1 = __importDefault(require("../validation/blog.validation"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const admin_middware_1 = __importDefault(require("../middlewares/admin.middware"));
const blog_controllers_1 = __importDefault(require("../controllers/blog.controllers"));
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *          -id
 *          -author_id
 *          -title
 *          -content
 *          -image
 *          -category_id
 *          -total_rate
 *          -date_created
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the blog
 *           required: true
 *         author_id:
 *           type: string
 *           description: The ID of the author who posted the post
 *           required: false
 *         title:
 *           type: string
 *           description: The title of the post
 *           required: true
 *         content:
 *           type: string
 *           description: The content of the post
 *           required: true
 *         image:
 *           type: string
 *           description: The link of image of the post
 *           required: false
 *         category_id:
 *           type: int
 *           description: The ID of the category
 *           required: true
 *         total_rate:
 *           type: int
 *           description: The number of rating
 *           required: false
 *         date_created:
 *           type: Date
 *           description: The date posted
 *           required: false
 *       example:
 *           blog_id: 14,
 *           author_id: 4,
 *           title: Hello world,
 *           content: Node.js is open-source and completely free—thousands of developers around the world use it daily. They use it to develop I/O intensive web applications, such as video streaming sites, single-page applications, online chat applications, and all kinds of other web apps. Built on Google Chrome's JavaScript-based runtime environment...,
 *           image: https://www.simplilearn.com/ice9/free_resources_article_thumb/mongodb.jpg,
 *           category_id: 7,
 *           total_rate: 0,
 *           date_created: 2022-11-08T02:48:45.000Z
 */
/**
 * @swagger
 * /blogs/:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: The list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get('/', user_middleware_1.default.authenToken, blog_controllers_1.default.getAllBlogs);
/**
 * @swagger
 * /blogs/:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *       example:
 *           title: NodeJS,
 *           content: Node.js is open-source and completely free—thousands of developers around the world use it daily. They use it to develop I/O intensive web applications, such as video streaming sites, single-page applications, online chat applications, and all kinds of other web apps. Built on Google Chrome's JavaScript-based runtime environment, Node.js brings plenty of advantages to the table....,
 *           image: https://www.simplilearn.com/ice9/free_resources_article_thumb/mongodb.jpg,
 *           category_id: 7
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */
router.post('/', [user_middleware_1.default.authenToken, admin_middware_1.default.checkAdminAuthentication, (0, express_validation_1.validate)(blog_validation_1.default.dataBlog, { keyByField: true }, {})], blog_controllers_1.default.createBlog);
/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     tags:
 *       - Blog
 *     summary: Update post information by post ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The post was not found
 */
router.put('/:id', [user_middleware_1.default.authenToken, admin_middware_1.default.checkAdminAuthentication, user_middleware_1.default.checkValidateParams, (0, express_validation_1.validate)(blog_validation_1.default.dataBlog, { keyByField: true }, {})], blog_controllers_1.default.updateBlog);
/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get post information by post ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Detail post information by post ID
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The post was not found
 */
router.get('/:id', [user_middleware_1.default.authenToken, user_middleware_1.default.checkValidateParams], blog_controllers_1.default.getBlogById);
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete post information by post ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The post was not found
 */
router.delete('/:id', [user_middleware_1.default.authenToken, admin_middware_1.default.checkAdminAuthentication, user_middleware_1.default.checkValidateParams], blog_controllers_1.default.removeBlog);
exports.default = router;
