import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import placeholder from "../assets/placeholder.jpg";
import likeIcon from "../assets/like.png";
import unlikeIcon from "../assets/unlike.png";

const Blog = ({ blog }) => {
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
        const userId = localStorage.getItem("userId")
        console.log(userId)
        const response = await axios.get(
          `http://localhost:3000/blogLike/check/${blogId}/${userId}`,
          // { userId },
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
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

      const response = await axios.post(
        `http://localhost:3000/blogLike/deleteBlogLike/${blogId}`,
        { userId },
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

  return (
    <div className="blog-card">
      <div className="blog-header">
        <h2>{title}</h2>
        {username && <p>By {username} {timeAgo}</p>}
      </div>

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

      <div className="blog-footer">
        <div className="blog-likes">
          <p>Likes: {likeCount}</p>
          {isLiked ? (
            <img src={likeIcon} alt="Unlike" onClick={handleUnlike} className="like-icon" style={{ height: "20px" }} disabled={loading} />
          ) : (
            <img src={unlikeIcon} alt="Like" onClick={handleLike} className="like-icon" style={{ height: "20px" }} disabled={loading} />
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="blog-tags">
            {tags.map((tag, index) => (
              <span key={index} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}
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
  }).isRequired
};

export default Blog;




// Blog.propTypes = {
//   blog: PropTypes.shape({
//     blogId: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//     tags: PropTypes.arrayOf(PropTypes.string),
//     user: PropTypes.shape({
//       username: PropTypes.string.isRequired,
//       profileUrl: PropTypes.string,
//     }).isRequired,
//     createdAt: PropTypes.string.isRequired,
//     Images: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string.isRequired,
//         type: PropTypes.string,
//       })
//     ),
//     likedBy: PropTypes.arrayOf(PropTypes.shape({
//       username: PropTypes.string.isRequired,
//     })),
//   }).isRequired,


// export default Blog;
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const Blog = ({ blog }) => {
//   const { text, tags, user, createdAt, Images, likedBy } = blog;
//   const media = Images || []; // Assume Images is an array of objects with 'url' property

//   const username = user?.username || ""  
//   return (
//     <div className="blog">
//       {media.length > 0 && (
//         <div className="blog-media">
//           {media.map((item, index) => (
//             <div key={index} className={blog-${item.type}}>
//               {item.url.endsWith('.pdf') ? (
//                 <iframe src={item.url} title={Blog PDF ${index + 1}} className="blog-pdf" />
//               ) : (
//                 <img src={item.url} alt={Blog Image ${index + 1}} className="blog-image" />
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="blog-content">
//         <p>{text}</p>
//       </div>

//       {tags && tags.length > 0 && (
//         <div className="blog-tags">
//           {tags.map((tag, index) => (
//             <span key={index} className="blog-tag">{tag}</span>
//           ))}
//         </div>
//       )}

//       <div className="blog-likes">
//         <p>Likes: {likedBy ? likedBy.length : 0}</p>
//       </div>

//       {username && <div className="blog-header">
//         <p>By {username} on {new Date(createdAt).toLocaleDateString()}</p>
//       </div>}
//     </div>
//   );
// };

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     tags: PropTypes.arrayOf(PropTypes.string),
//     user: PropTypes.shape({
//       username: PropTypes.string.isRequired,
//       profileUrl: PropTypes.string
//     }).isRequired,
//     createdAt: PropTypes.string.isRequired,
//     Images: PropTypes.arrayOf(PropTypes.shape({
//       url: PropTypes.string.isRequired
//     })),
//     likedBy: PropTypes.arrayOf(PropTypes.object)
//   }).isRequired
// };

// export default Blog;