const express = require('express');
const router = express.Router();
const { createUser, loginUser,logoutUser,myProfile,allUsers,user,deleteUser,profilepic } = require('./userController');
const {authenticateToken} = require('../../middleware/auth');
const uploadMiddleware = require('../../middleware/multer');
const prisma = require("../../prisma")

router.post('/signup',createUser)
router.post('/login',loginUser)
router.post('/logout',authenticateToken,logoutUser)
router.get('/my',authenticateToken,myProfile)
router.get('/user/:username',authenticateToken,user)
router.get('/all',allUsers)
router.delete('/delete',authenticateToken,deleteUser)
router.post('/uploadpic',authenticateToken,uploadMiddleware.single('image'),profilepic)

module.exports = router