const {createBlog,getAllBlogs,getBlogById,getMyBlogs,getBlogsOfFollowedUsers,fetchFollowedUsersBlogs,getBlogByUsername,getBlogBySearch,updateBlog,deleteBlog} = require('./blogController')
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createBlog',authenticateToken,createBlog)
router.get('/getAll',getAllBlogs)
router.get('/myBlogs',authenticateToken,getMyBlogs)
router.get('/blog/:id',authenticateToken,getBlogById)
router.get('/:username',authenticateToken,getBlogByUsername)
router.get('/blogs/blogFollow',authenticateToken,getBlogsOfFollowedUsers)
// router.get('/blogs/follow',authenticateToken,fetchFollowedUsersBlogs)
router.patch('/updateBlog/:id',authenticateToken,updateBlog)
router.delete('/deleteBlog/:id',authenticateToken,deleteBlog)
router.get('/search/:searchWord',authenticateToken,getBlogBySearch)

module.exports = router