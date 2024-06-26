const prisma = require("../../prisma");
const logger = require("../../utils/logger");

async function createFollow(req, res) {
    try {
        const { followedId } = req.body;  // ID of the user to be followed
        const followerId = req.user.userId; // ID of the current user (follower)

        // Check if the user is already following the target user
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followedId: {
                    followerId,
                    followedId
                }
            }
        });

        if (existingFollow) {
            return res.status(400).json({ error: "You are already following this user." });
        }

        const follow = await prisma.follow.create({
            data: {
                followerId,
                followedId
            }
        });
        logger.info("Follow created successfully:", follow);
        res.json(follow);
    } catch (error) {
        logger.error("Error creating follow:", error);
        res.send('An error occurred while creating the follow');
    }
}

async function unfollowUser(req, res) {
    try {
        const { followedId } = req.body; // ID of the user to be unfollowed
        const followerId = req.user.userId; // ID of the current user (follower)

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followedId: {
                    followerId,
                    followedId
                }
            }
        });

        if (!existingFollow) {
            return res.status(400).json({ error: "You are not following this user." });
        }

        await prisma.follow.delete({
            where: {
                followerId_followedId: {
                    followerId,
                    followedId
                }
            }
        });

        // Log and respond with success message
        logger.info("Unfollowed successfully.");
        res.json({ message: "Unfollowed successfully." });
    } catch (error) {
        logger.error("Error unfollowing user:", error);
        res.status(500).send('An error occurred while unfollowing the user');
    }
}

module.exports = {createFollow,unfollowUser }