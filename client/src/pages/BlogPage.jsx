import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import placeholder from "../assets/placeholder.jpg";
import likeIcon from "../assets/like.png";
import unlikeIcon from "../assets/unlike.png";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/blog/${blogId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch blog details');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { title, text, tags, user, createdAt, Images, likedBy, comments } = blog;
//   const firstImage = Images.length > 0 ? Images[0].url : placeholder;
  const username = user?.username || "";
  const userProfileUrl = user?.profileUrl || placeholder;
  const likeCount = likedBy ? likedBy.length : 0;

  return (
    <div className="blog-details">
      <div className="blog-header">
        <h1>{title}</h1>
        {username && <p>By <img src={userProfileUrl} alt={username} className="user-profile-image" /> {username} on {new Date(createdAt).toLocaleDateString()}</p>}
      </div>
      {/* <div className="blog-media">
        {firstImage.endsWith('.pdf') ? (
          <iframe src={firstImage} title="Blog PDF" className="blog-pdf" />
        ) : (
          <img src={firstImage} alt="Blog Media" className="blog-image" />
        )}
      </div> */}
      <div className="blog-content">
        <pre>{text}</pre>
      </div>
      <div className="blog-footer">
        <div className="blog-likes">
          <p>{likeCount}</p>
          <img src={likeIcon} alt="Like" className="like-icon" style={{ height: "20px" }} />
        </div>
        {tags && tags.length > 0 && (
          <div className="blog-tags">
            {tags.map((tag, index) => (
              <span key={index} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="blog-comments">
        <h2>Comments</h2>
        {comments.map(comment => (
          <div key={comment.commentId} className="comment">
            <p><strong>{comment.user.username}:</strong> {comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
