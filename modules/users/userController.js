const bcrypt = require('bcrypt');
const prisma = require('../../prisma');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');

async function createUser(req, res) {
    try {
      const { username,age,email,password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          age,
          email,
          password: hashedPassword,
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
          const token = jwt.sign({ _id: existingUser.id }, process.env.Access_Token); //, { expiresIn: '3h' }
          res.json(token);
          sendLogin();
        } else {
          logger.fatal("incorrect passsword")
          res.send('Invalid password');
        }
      } else {
        logger.error("user not found")
        res.status(400).send('User not found');
      }
    } catch (err) {
      logger.error("Error logging in", err);
      res.status(500).send('An error occurred while logging in');
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
        id: req.user.id
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
    const user = await prisma.user.findFirst({ where: { username: username } })
    logger.info("User found");
    res.send(user);
  } catch (err) {
    res.send(err);
    logger.error(err);
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
        id: req.user.id
      },
      data: {
        pfp: profilePicUrl
      }
    });
    logger.info("picture uploaded");
    return res.send("Profile picture uploaded and saved.");
  } catch (error) {
    logger.error("Error uploading profile picture:", error);
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

module.exports = { createUser,loginUser,myProfile,user,allUsers,profilepic,deleteUser,logoutUser }