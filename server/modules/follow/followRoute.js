const {createFollow} = require("./followController")
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/auth');
const prisma = require("../../prisma")

router.post('/createFollow',authenticateToken,createFollow)
module.exports = router