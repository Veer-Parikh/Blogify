const { createComment, getAllComments, getCommentsByBlogId, getCommentById, updateComment, deleteComment } = require('./commentController')
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createComment',authenticateToken,createComment)
router.get('/getAll',getAllComments)
router.get('/blogComment/:blogId',authenticateToken,getCommentsByBlogId)
router.get('/comment/:id',authenticateToken,getCommentById)
router.patch('/updateComment/:id',authenticateToken,updateComment)
router.delete('/deleteComment/:id',authenticateToken,deleteComment)

module.exports = router