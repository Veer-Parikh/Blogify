const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require("./utils/logger")

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin:'*'
    })
)

app.use(express.json());
app.use(bodyParser.json());


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

const userRoutes = require('./modules/users/userRoute')
app.use('/user',userRoutes)

const blogRoutes = require('./modules/blogs/blogRoute')
app.use('/blog',blogRoutes)

const commentRoutes = require('./modules/comments/commentRoute')
app.use('/comment',commentRoutes)

const blogLikeRoutes = require('./modules/blogLike/blogLikeRoute')
app.use('/blogLike',blogLikeRoutes)

const followRoutes = require('./modules/follow/followRoute')
app.use('/follow',followRoutes)