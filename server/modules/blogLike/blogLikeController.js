const prisma = require("../../prisma");
const logger = require("../../utils/logger");

async function createBlogLike(req, res) {
    try {
        const { blogId } = req.body;
        userId = req.user.userId
        const blogLike = await prisma.blogLike.create({
            data: {
                blogId,
                userId:userId
            }
        });
        logger.info("Blog Like created successfully");
        res.json(blogLike);
    } catch (error) {
        logger.error("Error creating blog like:", error);
        res.send('An error occurred while creating the blog like');
    }
}

async function getAllBlogLikes(req, res) {
    try {
        const blogLikes = await prisma.blogLike.findMany({
            select:{
                blogId:true,
                createdAt:true,
                userId:true,
                likeId:true
            }
        });
        res.json(blogLikes);
    } catch (error) {
        logger.error("Error fetching blog likes:", error);
        res.send('An error occurred while fetching blog likes');
    }
}

async function getMyBlogLikes(req, res) {
    try {
        // const blogId = req.body.blogId;
        const blog = await prisma.blogLike.findMany({
            where: { blogId:req.body.blogId },
            select:{
                blogId:true,
                createdAt:true,
                userId:true,
                likeId:true
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

// async function getBlogLikeById(req, res) {
//     try {
//         const blogId = req.params.id;
//         const blog = await prisma.blog.findUnique({
//             where: { blogId },
//             select:{
//                 blogId:true,
//                 text:true,
//                 Comment:true,
//                 createdAt:true
//             }
//         });
//         if (!blog) {
//             res.send('Blog not found');
//         } else {
//             res.json(blog);
//         }
//     } catch (error) {
//         logger.error("Error fetching blog:", error);
//         res.send('An error occurred while fetching the blog');
//     }
// }

async function deleteBlogLike(req, res) {
    try {
        await prisma.blogLike.delete({
            where: { likeId:req.params.likeId }
        });
        logger.info("Blog Like deleted successfully");
        res.send('Blog Like deleted successfully');
    } catch (error) {
        logger.error("Error deleting blog like:", error);
        res.send('An error occurred while deleting the blog like');
    }
}

module.exports = { createBlogLike,getAllBlogLikes,getMyBlogLikes,deleteBlogLike }
