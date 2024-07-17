import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import placeholder from "../assets/placeholder.jpg";
import likeIcon from "../assets/like.png";
import unlikeIcon from "../assets/unlike.png";
import { ToastContainer,toast } from 'react-toastify';
import Alert from "@mui/material/Alert"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Blog = ({ blog, onDelete, visible }) => {
  const { blogId, title, text, tags, user, createdAt, Images, likedBy } = blog;
  const media = Images || [];
  const username = user?.username || "";
  const firstImage = media.length > 0 ? media[0].url : placeholder;
  const truncatedText = text.split(' ').slice(0, 100).join(' ') + '...';
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likedBy ? likedBy.length : 0);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        if (!token) {
          throw new Error('Authorization token is missing');
        }
        const response = await axios.get(
          `http://localhost:3000/blogLike/check/${blogId}/${userId}`
        );

        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [blogId, userId, token]);

  const handleLike = async () => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error('Authorization token is missing');
      }
      const response = await axios.post(
        `http://localhost:3000/blogLike/createBlogLike/${blogId}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      } else {
        throw new Error('Failed to like blog');
      }
    } catch (error) {
      console.error('Error liking blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    try {
      setLoading(true);
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await axios.delete(
        `http://localhost:3000/blogLike/deleteBlogLike/${blogId}/${userId}`,
        // { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        throw new Error('Failed to unlike blog');
      }
    } catch (error) {
      console.error('Error unliking blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!token) {
        throw new Error('Authorization token is missing');
      }
      const response = await axios.delete(
        `http://localhost:3000/blog/deleteBlog/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onDelete(blogId); // Call the onDelete prop to update the state in the parent component
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="blog-card">
      <Link  to={`/blog/${blogId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="blog-header">
        <h2>{title}</h2>
        {username && <p>By {username} {timeAgo}</p>}
      </div>
      {/* <Alert severity="success">This is a success Alert.</Alert> */}
      <div className="blog-media">
        {firstImage.endsWith('.pdf') ? (
          <iframe src={firstImage} title="Blog PDF" className="blog-pdf" />
        ) : (
          <img src={firstImage} alt="Blog Media" className="blog-image" />
        )}
      </div>

      <div className="blog-content" style={{ overflow: "hidden" }}>
        <pre>{truncatedText}</pre>
      </div>
      </Link>
      <div className="blog-footer">
        <div className="blog-likes">
          <p>{likeCount}</p>
          {isLiked ? (
            <img src={likeIcon} alt="Unlike" onClick={handleUnlike} className="like-icon" style={{ height: "20px" }} disabled={loading} />
          ) : (
            <img src={unlikeIcon} alt="Like" onClick={handleLike} className="like-icon" style={{ height: "20px" }} disabled={loading} />
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="blog-tags" style={{marginTop:"15px"}}>
            {tags.map((tag, index) => (
              <span key={index} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}

        <button onClick={handleDelete} style={{display:`${visible}`}} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    blogId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      profileUrl: PropTypes.string
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })),
    likedBy: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Blog;