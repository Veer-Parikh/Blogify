const prisma = require("../../prisma");
const logger = require("../../utils/logger");

async function createFollow(req, res) {
    try {
        const { followedId } = req.body; // ID of the user to be followed
        const followerId = req.user.userId; // ID of the current user (follower)

        // Check if the follower and followed users exist
        const followerUser = await prisma.user.findUnique({ where: { userId: followerId } });
        const followedUser = await prisma.user.findUnique({ where: { userId: followedId } });

        if (!followerUser || !followedUser) {
            return res.status(404).json({ error: "One or both users do not exist." });
        }

        // Prevent users from following themselves
        if (followerId === followedId) {
            return res.status(400).json({ error: "You cannot follow yourself." });
        }

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

        // Create the follow relationship
        const follow = await prisma.follow.create({
            data: {
                followerId,
                followedId
            }
        });

        logger.info("Follow created successfully:", follow);
        res.status(201).json(follow); // Return a 201 status for creation
    } catch (error) {
        logger.error("Error creating follow:", error);
        res.status(500).json({ error: 'An error occurred while creating the follow' });
    }
}

async function unfollowUser(req, res) {
    try {
        const { followedId } = req.body; // ID of the user to be unfollowed
        const followerId = req.user.userId; // ID of the current user (follower)

        // Check if the follower and followed users exist
        const followerUser = await prisma.user.findUnique({ where: { userId: followerId } });
        const followedUser = await prisma.user.findUnique({ where: { userId: followedId } });

        if (!followerUser || !followedUser) {
            return res.status(404).json({ error: "One or both users do not exist." });
        }

        // Check if the follow relationship exists
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

        // Delete the follow relationship
        await prisma.follow.delete({
            where: {
                followerId_followedId: {
                    followerId,
                    followedId
                }
            }
        });

        logger.info("Unfollowed successfully.");
        res.json({ message: "Unfollowed successfully." });
    } catch (error) {
        logger.error("Error unfollowing user:", error);
        res.status(500).json({ error: 'An error occurred while unfollowing the user' });
    }
}

const checkFollow = async (req, res) => {
    try {
      const currentUserId = req.user.userId; // Get the current user's ID from the auth middleware
      const followedId = req.params.followedId; // Get the ID of the user to check from the request parameters
  
      // Check if the follow relationship exists
      const follow = await prisma.follow.findFirst({
        where: {
          followerId: currentUserId,
          followedId: followedId,
        },
      });
  
      // Respond with whether the current user is following the specified user
      if (follow) {
        return res.status(200).json({ isFollowing: true });
      } else {
        return res.status(200).json({ isFollowing: false });
      }
    } catch (error) {
      console.error('Error checking follow status:', error);
      return res.status(500).json({ message: 'Server error while checking follow status' });
    }
  };

module.exports = { createFollow, unfollowUser, checkFollow };
