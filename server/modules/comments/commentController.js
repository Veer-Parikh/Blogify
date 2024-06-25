const prisma = require("../../prisma");
const logger = require("../../utils/logger");

async function createComment(req, res) {
    try {
        const { text, blogId } = req.body;
        const userId = req.user.userId; // Assuming user information is available in req.user
        const comment = await prisma.comment.create({
            data: {
                text,
                blog: { connect: { blogId } }, // Connect the comment to the specified blog
                user: { connect: { userId } } // Connect the comment to the current user
            }
        });
        logger.info("Comment created successfully");
        res.json(comment);
    } catch (error) {
        logger.error("Error creating comment:", error);
        res.send('An error occurred while creating the comment');
    }
}

async function getAllComments(req, res) {
    try {
        const comments = await prisma.comment.findMany({
            select:{
                user:true,
                blog:true,
                commentId:true,
                text:true,
                createdAt:true,
                blogBlogId:true,
                userUserId:true
            }
        });
        res.json(comments);
    } catch (error) {
        logger.error("Error fetching comments:", error);
        res.send('An error occurred while fetching comments');
    }
}

async function getCommentsByBlogId(req, res) {
    try {
        const blogId = req.params.blogId;
        const comments = await prisma.comment.findMany({
            where: { blogBlogId: blogId }, // Filter comments by the specified blogId
            select:{
                user:true,
                blog:true,
                commentId:true,
                text:true,
                createdAt:true,
                blogBlogId:true,
                userUserId:true
            }
        });
        res.json(comments);
    } catch (error) {
        logger.error("Error fetching comments:", error);
        res.send('An error occurred while fetching comments');
    }
}

async function getCommentById(req, res) {
    try {
        const commentId = req.params.id;
        const comment = await prisma.comment.findUnique({
            where: { blogId: commentId },
            select:{
                user:true,
                blog:true,
                commentId:true,
                text:true,
                createdAt:true,
                blogBlogId:true,
                userUserId:true
            }
        });
        if (!comment) {
            res.send('Comment not found');
        } else {
            res.json(comment);
        }
    } catch (error) {
        logger.error("Error fetching comment:", error);
        res.send('An error occurred while fetching the comment');
    }
}

async function updateComment(req, res) {
    try {
        const commentId = req.params.id;
        const { text } = req.body;
        const updatedComment = await prisma.comment.update({
            where: { blogId: commentId },
            data: { text }
        });
        logger.info("Comment updated successfully");
        res.json(updatedComment);
    } catch (error) {
        logger.error(error);
        res.send('An error occurred while updating the comment');
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = req.params.id;
        await prisma.comment.delete({
            where: { blogId: commentId }
        });
        logger.info("Comment deleted successfully");
        res.send('Comment deleted successfully');
    } catch (error) {
        logger.error("Error deleting comment:", error);
        res.send('An error occurred while deleting the comment');
    }
}

module.exports = { createComment, getAllComments, getCommentsByBlogId, getCommentById, updateComment, deleteComment };
