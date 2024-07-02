const {createFollow,unfollowUser,checkFollow} = require("./followController")
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createFollow',authenticateToken,createFollow)
router.get('/checkFollow/:followedId',authenticateToken,checkFollow)
router.delete('/unfollow',authenticateToken,unfollowUser)

module.exports = router