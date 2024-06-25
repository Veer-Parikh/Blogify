const {createBlogLike,getAllBlogLikes,getMyBlogLikes,deleteBlogLike} = require("./blogLikeController")
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createBlogLike',authenticateToken,createBlogLike)
router.get('/getAll',getAllBlogLikes)
router.get('/myBlogLikes',authenticateToken,getMyBlogLikes)
router.delete('/deleteBlog/:likeId',authenticateToken,deleteBlogLike)

module.exports = router