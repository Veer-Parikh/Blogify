const {createBlogLike,getAllBlogLikes,getMyBlogLikes,deleteBlogLike, checkBlogLike} = require("./blogLikeController")
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createBlogLike/:blogId',createBlogLike)
router.get('/getAll',getAllBlogLikes)
router.get('/check/:blogId/:userId',checkBlogLike)
router.get('/myBlogLikes',authenticateToken,getMyBlogLikes)
router.delete('/deleteBlogLike/:blogId',deleteBlogLike)

module.exports = router