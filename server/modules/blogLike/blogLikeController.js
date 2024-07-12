const prisma = require("../../prisma");
const logger = require("../../utils/logger");

const createBlogLike = async (req, res) => {
    try {
      const { blogId } = req.params;
      const userId = req.body.userId; // Assuming you get the userId from authenticated user
  
      if (!blogId) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }
  
      // Check if the blog like already exists
      const existingBlogLike = await prisma.blogLike.findUnique({
        where: {
          userId_blogId: {
            userId:userId,
            blogId,
          },
        },
      });
  
      if (existingBlogLike) {
        return res.status(400).json({ error: 'User has already liked this blog' });
      }
  
      // Create new blog like
      const blogLike = await prisma.blogLike.create({
        data: {
          blogId,
          userId:userId,
        },
      });
      logger.info("blog like created successfully")
      res.status(201).json(blogLike);
    } catch (error) {
      console.error('Error creating blog like:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// async function checkBlogLike(req,res) {
//     try{
//         const currentUserId = req.body.userId;
//         const blogId = req.params;

//         const like = prisma.blogLike.findFirst({
//             where:{
//                 blogId:blogId,
//                 userId:currentUserId
//             },
//             include:{
//                 user:true,
//                 blog:true
//             }
//         })

//         if(like){
//             logger.info({blogId,isLiked:true})
//             return res.status(200).json({isLiked:true})
//         } else {
//             logger.error(like)
//             return res.status(200).json({isLiked:false})
//         }
//     } catch(error){
//         logger.error(error)
//         res.send(error)
//     }
// }

const checkBlogLike = async (req, res) => {
    try {
    //   const userId = req.body.userId; // Assuming the userId is available in the request object after authentication
      const { blogId,userId } = req.params;
  
      const like = await prisma.blogLike.findUnique({
        where: {
            userId_blogId:{
                blogId: blogId,
                userId:userId
            }
        }
      });
      return res.status(200).json({ isLiked: !!like }); // Return true if a like is found, false otherwise
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error});
    }
};  

async function getAllBlogLikes(req, res) {
    try {
        const blogLikes = await prisma.blogLike.findMany({
            select:{
                blogId:true,
                createdAt:true,
                userId:true,
                likeId:true
            }
        });
        res.json(blogLikes);
    } catch (error) {
        logger.error("Error fetching blog likes:", error);
        res.send('An error occurred while fetching blog likes');
    }
}

async function getMyBlogLikes(req, res) {
    try {
        // const blogId = req.body.blogId;
        const blog = await prisma.blogLike.findMany({
            where: { blogId:req.body.blogId },
            select:{
                blogId:true,
                createdAt:true,
                userId:true,
                likeId:true
            }
        });
        if (!blog) {
            res.send('Blog not found/user doesnt have blogs');
        } else {
            res.json(blog);
        }
    } catch (error) {
        logger.error("Error fetching blog:", error);
        res.send('An error occurred while fetching the blog');
    }
}

// async function getBlogLikeById(req, res) {
//     try {
//         const blogId = req.params.id;
//         const blog = await prisma.blog.findUnique({
//             where: { blogId },
//             select:{
//                 blogId:true,
//                 text:true,
//                 Comment:true,
//                 createdAt:true
//             }
//         });
//         if (!blog) {
//             res.send('Blog not found');
//         } else {
//             res.json(blog);
//         }
//     } catch (error) {
//         logger.error("Error fetching blog:", error);
//         res.send('An error occurred while fetching the blog');
//     }
// }

async function deleteBlogLike(req, res) {
    try {
        await prisma.blogLike.delete({
            where: { 
              userId_blogId:{
                blogId:req.params.blogId,userId:req.params.userId
              }
            }
        });
        logger.info("Blog Like deleted successfully");
        res.send('Blog Like deleted successfully');
    } catch (error) {
        logger.error(error);
        res.send('An error occurred while deleting the blog like');
    }
}

module.exports = { createBlogLike,getAllBlogLikes,getMyBlogLikes,checkBlogLike,deleteBlogLike }
