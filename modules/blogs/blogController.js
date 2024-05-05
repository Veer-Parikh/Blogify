const prisma = require("../../prisma");
const logger = require("../../utils/logger");

async function createBlog(req, res) {
    try {
        const { text } = req.body;
        userId = req.user.userId
        const blog = await prisma.blog.create({
            data: {
                text,
                userUserId: userId
            }
        });
        logger.info("Blog created successfully");
        res.json(blog);
    } catch (error) {
        logger.error("Error creating blog:", error);
        res.send('An error occurred while creating the blog');
    }
}

async function getAllBlogs(req, res) {
    try {
        const blogs = await prisma.blog.findMany({
            select:{
                blogId:true,
                text:true,
                Comment:true,
                createdAt:true
            }
        });
        res.json(blogs);
    } catch (error) {
        logger.error("Error fetching blogs:", error);
        res.send('An error occurred while fetching blogs');
    }
}

async function getMyBlogs(req, res) {
    try {
        const blogId = req.user.id;
        const blog = await prisma.blog.findMany({
            where: { blogId },
            select:{
                blogId:true,
                text:true,
                Comment:true,
                createdAt:true
            }
        });
        if (!blog) {
            res.send('Blog not found/user doesnt have blogs');
        } else {
            res.json(blog);
        }
    } catch (error) {
        logger.error("Error fetching blog:", error);
        res.send('An error occurred while fetching the blog');
    }
}

async function getBlogById(req, res) {
    try {
        const blogId = req.params.id;
        const blog = await prisma.blog.findUnique({
            where: { blogId },
            select:{
                blogId:true,
                text:true,
                Comment:true,
                createdAt:true
            }
        });
        if (!blog) {
            res.send('Blog not found');
        } else {
            res.json(blog);
        }
    } catch (error) {
        logger.error("Error fetching blog:", error);
        res.send('An error occurred while fetching the blog');
    }
}

async function updateBlog(req, res) {
    try {
        const blogId = req.params.id;
        const { text } = req.body;
        const updatedBlog = await prisma.blog.update({
            where: { blogId },
            data: { text }
        });
        logger.info("Blog updated successfully");
        await res.json(updatedBlog);
    } catch (error) {
        logger.error(error);
        res.send('An error occurred while updating the blog');
    }
}

async function deleteBlog(req, res) {
    try {
        const blogId = req.params.id;
        await prisma.blog.delete({
            where: { blogId }
        });
        logger.info("Blog deleted successfully");
        res.send('Blog deleted successfully');
    } catch (error) {
        logger.error("Error deleting blog:", error);
        res.send('An error occurred while deleting the blog');
    }
}

module.exports = { createBlog,getAllBlogs,getBlogById,getMyBlogs,updateBlog,deleteBlog }