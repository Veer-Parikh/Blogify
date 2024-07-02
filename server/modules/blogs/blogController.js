const { P } = require("pino");
const prisma = require("../../prisma");
const logger = require("../../utils/logger");

async function createBlog(req, res) {
    try {
        const { text,tags } = req.body;
        userId = req.user.userId
        const tagsArray = tags.split(' ').map(tag => tag.trim());
        const blog = await prisma.blog.create({
            data: {
                text,
                userUserId: userId,
                tags: tagsArray
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
                comments:true,
                createdAt:true,
                likedBy:true,
                user:true,
                Images:{
                    select:{
                        url:true,
                        imageId:true
                    }
                }
            },
            orderBy:{
                likedBy:{_count:"desc"}
            }
        })
        res.json(blogs);
    } catch (error) {
        logger.error("Error fetching blogs:", error);
        res.send('An error occurred while fetching blogs');
    }
}

async function getBlogsOfFollowedUsers(req, res) {
    try {
        const userId = req.user.userId; // ID of the current user, retrieved from the request's user object
        
        // Step 1: Find the IDs of users that the current user is following
        const following = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followedId: true }
        });

        // Extract followed user IDs
        const followedUserIds = following.map(follow => follow.followedId);

        // Step 2: Find blogs written by these users
        const blogs = await prisma.blog.findMany({
            where: {
                userUserId: {
                    in: followedUserIds
                }
            },
            include: {
                user: true,  // Optionally include user details who wrote the blog
                comments: true // Optionally include comments on the blogs
            },
            orderBy:{
                createdAt:"desc"
            }
        });

        res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs of followed users:", error);
        res.status(500).send('An error occurred while fetching the blogs');
    }
}

async function getMyBlogs(req, res) {
    try {
        const userId = req.user.userId;
        const blog = await prisma.blog.findMany({
            where: { userUserId:userId },
            select:{
                blogId:true,
                text:true,
                comments:true,
                createdAt:true,
                likedBy:true,
                user:true
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
                comments:true,
                createdAt:true,
                likedBy:true,
                user:true
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

async function getBlogBySearch(req,res){
    try {
        const searchWord = req.params.searchWord;
        const blogs = await prisma.blog.findMany({
            where:{
                OR:[
                    {
                        tags:{
                            hasSome:[searchWord],
                            // mode:'insensitive'
                        }
                    },
                    {
                        text:{
                            contains:searchWord,
                            // mode:"insensitive"
                        }
                    },
                    {
                        user:{
                            username:{
                                contains:searchWord,
                                // mode:"insensitive"
                            }
                        }
                    }
                ]
            },
            select:{
                _count:true,
                blogId:true,
                comments:true,
                createdAt:true,
                Images:true,
                likedBy:true,
                tags:true,
                text:true,
                user:true,
                userUserId:true
            }
        });
        logger.info("Blogs found")
        return res.send(blogs)
    } catch (error){
        logger.error(error)
        res.send(error)
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

module.exports = { createBlog,getAllBlogs,getBlogById,getMyBlogs,getBlogsOfFollowedUsers,getBlogBySearch,updateBlog,deleteBlog }