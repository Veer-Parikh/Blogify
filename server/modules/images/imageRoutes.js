const express = require('express');
const router = express.Router();
const {uploadImage} = require('./imageController')
const {authenticateToken} = require('../../middleware/auth');
const uploadMiddleware = require('../../middleware/multer');

router.post('/uploadImages',authenticateToken,uploadMiddleware.array('image'),uploadImage)

module.exports = router