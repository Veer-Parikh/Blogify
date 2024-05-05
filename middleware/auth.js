const jwt = require('jsonwebtoken'); // Import jsonwebtoken module
const prisma = require("../prisma");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).send("")
  }

  jwt.verify(token, process.env.Access_Token, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' }); // Corrected status code
    }
    try {
      const user = await prisma.user.findFirst({ where: { userId: decoded._id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Corrected status code
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('Error authenticating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' }); // Corrected status code
    }
  });
}

module.exports = { authenticateToken }