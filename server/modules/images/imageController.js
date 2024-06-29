const prisma = require('../../prisma');
const cloudinary = require('cloudinary').v2;
const logger = require('../../utils/logger');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImage(req, res) {
    try {
        if (!req.files || req.files.length === 0) {
          return res.send("No files were uploaded.");
        }
    
        const urls = [];
    
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          urls.push(result.secure_url);
        }
    
        // Save the image URLs to the database
        const imageData = urls.map(url => ({
          blogBlogId: req.body.blogBlogId,
          url: url
        }));
    
        const images = await prisma.images.createMany({
          data: imageData
        });
        logger.info("Pictures uploaded successfully");
    
        return res.json({ message: "Images uploaded and saved.", images });
    } catch (error) {
        logger.error(error.message || error);
        return res.status(400).json({ error: error.message });
    }
}


module.exports = {uploadImage}