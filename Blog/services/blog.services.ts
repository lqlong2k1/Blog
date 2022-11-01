import { IBlog } from '../interface/blog.interface';
import prisma from '../utils/prisma';
import * as errMessage from '../const/err-messages.const';
import *as successMessage from '../const/success-messages.const';
import dotenv from 'dotenv';

dotenv.config();

export async function createBlog(author_id: number, { ...rest }: IBlog) {
    console.log("Author id: ", author_id);
    const post = await prisma.blog.create({
        data: {
            ...rest,
            author_id
        }
    });
    return post;
}

export async function getAllBlog() {
    const blogs = await prisma.blog.findMany();
    return blogs;
}

export async function getBlogById(id: number){
    const blog = await prisma.blog.findFirst({
        where: {
            blog_id: id
        }
    })
    if (!blog){
        return errMessage.NOT_FOUND_BLOG;
    }
    return blog;
}

export async function updateBlog(id: number, blog:IBlog){
    const isBlog = await prisma.blog.findFirst({
        where: {
            blog_id: id
        }
    })
    if (!isBlog){
        return errMessage.NOT_FOUND_BLOG;
    }
    const isUpdated = await prisma.blog.update({
        where: {
            blog_id: id
        },
        data:{
            title: blog.title,
            content: blog.content,
            image: blog.image,
            category_id: blog.category_id
        }
    });
    if (!isUpdated){
        errMessage.UPDATE_BLOG_FAIL;
    }
    return successMessage.UPDATE_BLOG_SUCCESS;
}

export async function removeBlog(blogId: number){
    const isBlog = await prisma.blog.findFirst({
        where: {
            blog_id: blogId
        }
    })
    if (!isBlog){
        return errMessage.NOT_FOUND_BLOG;
    }
    const isRemoved = await prisma.blog.delete({
        where: {
            blog_id: blogId
        }
    })
    if (!isRemoved) return errMessage.REMOVE_BLOG_FAIL
    return successMessage.REMOVE_BLOG_SUCCESS

}
