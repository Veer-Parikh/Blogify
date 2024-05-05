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
module.exports = { createUser,loginUser,myProfile,user,allUsers }