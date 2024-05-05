const {createBlog,getAllBlogs,getBlogById,getMyBlogs,updateBlog,deleteBlog} = require('./blogController')
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createBlog',authenticateToken,createBlog)
router.get('/getAll',getAllBlogs)
router.get('/myBlogs',authenticateToken,getMyBlogs)
router.get('/blog/:id',authenticateToken,getBlogById)
router.patch('/updateBlog/:id',authenticateToken,updateBlog)
router.delete('/deleteBlog/:id',authenticateToken,deleteBlog)

module.exports = router