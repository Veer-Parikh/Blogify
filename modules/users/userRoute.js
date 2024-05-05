const express = require('express');
const router = express.Router();
const { createUser, loginUser,myProfile,allUsers,user } = require('./userController');
const {authenticateToken} = require('../../middleware/auth');
// const uploadMiddleware = require('../../middleware/multer');
const prisma = require("../../prisma")

router.post('/signup',createUser)
router.post('/login', loginUser)
router.get('/my',authenticateToken,myProfile)
router.get('/user/:username',authenticateToken,user)
router.get('/all',allUsers)

module.exports = router