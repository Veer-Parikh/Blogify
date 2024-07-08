const bcrypt = require('bcrypt');
const prisma = require('../../prisma');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const { P } = require('pino');

async function createUser(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const profilePicUrl = result.secure_url;
      const { username,age,email,password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const ageInt = parseInt(age, 10);
      const user = await prisma.user.create({
        data: {
          username,
          age:ageInt,
          email,
          password: hashedPassword,
          profileUrl: profilePicUrl
        },
      })
        .then((user) => {
          logger.info("User saved successfully");
        })
        .catch((err) => {
          logger.fatal(err);
        });
      res.send(user);
    } catch (error) {
      logger.error(error);
      res.send(error);
    }
}

async function loginUser(req, res) {
  try {
      const { username, password } = req.body;
      const existingUser = await prisma.user.findFirst({ where: { username: username } });

      if (existingUser) {
          const validPass = await bcrypt.compare(password, existingUser.password);
          if (validPass) {
              const token = jwt.sign({ _id: existingUser.userId }, process.env.Access_Token);
              res.json(token);
              logger.info("user login successful")
          } else {
              logger.fatal("incorrect password");
              res.status(401).send('Invalid password'); // Send 401 Unauthorized status for incorrect password
          }
      } else {
          logger.error("user not found");
          res.status(404).send('User not found'); // Send 404 Not Found status for user not found
      }
  } catch (err) {
      logger.error("Error logging in", err);
      res.status(500).send('An error occurred while logging in'); // Send 500 Internal Server Error status for other errors
  }
}


async function logoutUser(req, res) {
  try {
      // res.clearCookie('token');
      res.status(200).send('Logged out successfully');
  } catch (err) {
      logger.error("Error logging out", err);
      res.send('An error occurred while logging out');
  }
}

async function myProfile(req, res) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        userId: req.user.userId
      },
      select:{
        username:true,
        email:true,
        profileUrl:true,
        userId:true,
        createdAt:true,
        age:true,
        blogs:true,
        comments:true,
        likedBlogs:true,
        followers:true,
        following:true    
      }
    });
    logger.info("User profile found successfully");
    res.send(user);
  } catch (err) {
    res.send(err);
    logger.error(err);
  }
}

async function allUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select:{
        username:true,
        email:true,
        profileUrl:true,
        userId:true,
        createdAt:true,
        age:true,
        blogs:true,
        comments:true,
        likedBlogs:true,
        followers:true,
        following:true   
      }
    })
    logger.info("Users profile found successfully");
    return res.status(200).json(users);
  } catch (err) {
    logger.error(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function user(req, res) {
  const { username } = req.params;
  try {
    const user = await prisma.user.findFirst({ 
      where: { username: username },
      select:{
        username:true,
        email:true,
        profileUrl:true,
        userId:true,
        createdAt:true,
        age:true,
        blogs:true,
        comments:true,
        likedBlogs:true,
        followers:true,
        following:true   
      }
    })
    logger.info("User found");
    res.send(user);
  } catch (err) {
    res.send(err);
    logger.error(err);
  }
}

async function getUserBySearch(req,res) {
  try {
    const user = await prisma.user.findMany({
      where:{
        username:{
          contains:req.params.username,
          mode:'insensitive'
        }
      },
      select:{
        _count:true,
        age:true,
        blogs:true,
        comments:true,
        createdAt:true,
        email:true,
        followers:true,
        following:true,
        likedBlogs:true,
        profileUrl:true,
        userId:true,
        username:true
      },
      orderBy:{
        followers :{_count:'desc'}
      }
    });
    res.send(user)
    logger.info("Users found")
  } catch (error) {
    res.send(error)
    logger.error(error)
  }
}
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function profilepic(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const profilePicUrl = result.secure_url;

    const user = await prisma.user.update({
      where: {
        userId: req.user.userId
      },
      data: {
        profileUrl: profilePicUrl
      }
    });
    logger.info("picture uploaded");
    return res.send("Profile picture uploaded and saved.");
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.user.id
      }
    });
    if (!user) {
      logger.error("User doesn't exist");
      return res.send("User does not exist");
    }
    if (user) {
      logger.info("User deleted successfully");
      return res.send("User deleted successfully");
    }
  } catch (err) {
    logger.error(err);
    res.status(400).send(err);
  }
}

module.exports = { createUser,loginUser,myProfile,user,getUserBySearch,allUsers,profilepic,deleteUser,logoutUser }