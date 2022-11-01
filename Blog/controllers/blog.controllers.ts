import { Request, Response, NextFunction } from 'express';
import adminMiddleware from '../middlewares/admin.middware';
import * as blogServices from '../services/blog.services';

const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await blogServices.getAllBlog();
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'list all blogs',
            data: blogs
        });
    } catch (error) {
        throw res.status(400).json('ERROR: ' + error);
    }
}

const getBlogById = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id)
        const blog = await blogServices.getBlogById(blogId);
        return res.json({
            method: 'GET',
            status: 'success',
            description: 'get blog by blog ID',
            data: blog
        })
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}

const createBlog = async (req: any, res: Response) => {
    try {
        console.log(req.admin)
        const authorId: number = req.admin.id;
        const user = await blogServices.createBlog(authorId, req.body);
        return res.json({
            method: 'POST',
            status: 'success',
            description: 'Create a new blog',
            data: user
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);

    }
}
const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id);
        const blogData = req.body;
        const isUpdated = await blogServices.updateBlog(blogId, blogData);
        return res.json({
            method: 'PUT',
            status: 'success',
            description: 'Update blog',
            data: isUpdated
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}

const removeBlog = async (req: Request, res: Response) => {
    try {
        const blogId = Number(req.params.id);
        const isRemoved = await blogServices.removeBlog(blogId);
        return res.json({
            method: 'DELETE',
            status: 'success',
            description: 'Remove blog by blog ID',
            data: isRemoved
        });
    } catch (error) {
        console.log(error);
        throw res.status(400).json('ERROR: ' + error);
    }
}
export default {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    removeBlog
}