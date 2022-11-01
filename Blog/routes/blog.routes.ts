import express from 'express';
import { validate } from 'express-validation';
import blogValidation from '../validation/blog.validation';
import userMiddleware from '../middlewares/user.middleware';
import adminMiddleware from '../middlewares/admin.middware';
import blogController from '../controllers/blog.controllers';

const router = express.Router();

router.get('/', userMiddleware.authenToken, blogController.getAllBlogs);
router.post('/', userMiddleware.authenToken, adminMiddleware.checkAdminAuthentication, [validate(blogValidation.createBlog, { keyByField: true }, {})], blogController.createBlog);
router.put('/:id', userMiddleware.authenToken, adminMiddleware.checkAdminAuthentication, [validate(blogValidation.createBlog, { keyByField: true }, {})], blogController.updateBlog);
router.get('/:id', userMiddleware.authenToken, blogController.getBlogById);
router.delete('/:id', userMiddleware.authenToken, adminMiddleware.checkAdminAuthentication, blogController.removeBlog);
export default router; 