import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import placeholder from "../assets/placeholder.jpg";
import likeIcon from "../assets/like.png";
import unlikeIcon from "../assets/unlike.png";
import Navbar from '../components/Navbar';
import blank from "../assets/blank.webp"

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/blog/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlog(response.data);
        setLikeCount(response.data.likedBy ? response.data.likedBy.length : 0);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch blog details');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, token]);

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
      setLikeLoading(true);
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
      setLikeLoading(false);
    }
  };

  const handleUnlike = async () => {
    try {
      setLikeLoading(true);
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await axios.delete(
        `http://localhost:3000/blogLike/deleteBlogLike/${blogId}/${userId}`,
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
      setLikeLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { title, text, tags, user, createdAt, Images, comments } = blog;
  const username = user?.username || "";
  const userProfileUrl = user?.profileUrl || placeholder;
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div>
    <Navbar />
    <div className="blog-details" style={{paddingTop:"100px",marginLeft:"20px",marginRight:"20px"}}>
      <div className="blog-header">
        <h1 style={{ fontWeight: 'bold' , color :"white" }}>{title}</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userProfileUrl} alt={username} className="user-profile-image" style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} />
          <div>
            <p>{username}</p>
            <p>{timeAgo}</p>
          </div>
          <div className="blog-likes" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <p>{likeCount}</p>
            {isLiked ? (
              <img src={likeIcon} alt="Unlike" onClick={handleUnlike} className="like-icon" style={{ height: "20px", marginLeft: '10px' }} disabled={likeLoading} />
            ) : (
              <img src={unlikeIcon} alt="Like" onClick={handleLike} className="like-icon" style={{ height: "20px", marginLeft: '10px' }} disabled={likeLoading} />
            )}
          </div>
        </div>
      </div>
      <div className="blog-media">
        {Images.map((image, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {image.url.endsWith('.pdf') ? (
              <iframe src={image.url} title={`Blog PDF ${index}`} className="blog-pdf" style={{ width: '100%', height: '500px' }} />
            ) : (
              <img src={image.url} alt={`Blog Media ${index}`} className="blog-image" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
            )}
          </div>
        ))}
      </div>
      <div className="blog-content">
        <pre>{text}</pre>
      </div>
      <hr style={{ margin: '20px 0' }} />
      <div className="blog-comments" style={{flexDirection:"column",marginBottom:"20px",padding:"30px",backgroundColor:"black"}}>
        <h2 style={{marginLeft:"20px"}}>Comments</h2>
        <div style={{display:"flex",alignItems:"center"}}>
          <input className='input-comment'></input>
          <img src={blank} style={{width:"3%",borderRadius:"50%"}}></img>
        </div>
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.commentId} className="comment" style={{ marginBottom: '8px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' , backgroundColor : '#1e1e1e' , display:"flex" , alignItems:"center" , justifyContent:"space-between",marginLeft:"20px",marginRight:"20px"}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={comment.user.profileUrl || placeholder} alt={comment.user.username} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
                <p style={{width:"100px"}}><strong>{comment.user.username}</strong></p>
                <p>{comment.text}</p>
              </div>
              <p style={{ fontSize: '12px', color: '#555' , marginRight:"20px" }}>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
            </div>
          ))
        ) : (
          <p>No comments on this blog yet.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default BlogPage;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import placeholder from "../assets/placeholder.jpg";
// import likeIcon from "../assets/like.png";
// import unlikeIcon from "../assets/unlike.png";

// const BlogPage = () => {
//   const { blogId } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("accessToken")

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/blog/blog/${blogId}`,{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             }
//         });
//         setBlog(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch blog details');
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const { title, text, tags, user, createdAt, Images, likedBy, comments } = blog;
// //   const firstImage = Images.length > 0 ? Images[0].url : placeholder;
//   const username = user?.username || "";
//   const userProfileUrl = user?.profileUrl || placeholder;
//   const likeCount = likedBy ? likedBy.length : 0;

//   return (
//     <div className="blog-details">
//       <div className="blog-header">
//         <h1>{title}</h1>
//         {username && <p>By <img src={userProfileUrl} alt={username} className="user-profile-image" /> {username} on {new Date(createdAt).toLocaleDateString()}</p>}
//       </div>
//       {/* <div className="blog-media">
//         {firstImage.endsWith('.pdf') ? (
//           <iframe src={firstImage} title="Blog PDF" className="blog-pdf" />
//         ) : (
//           <img src={firstImage} alt="Blog Media" className="blog-image" />
//         )}
//       </div> */}
//       <div className="blog-content">
//         <pre>{text}</pre>
//       </div>
//       <div className="blog-footer">
//         <div className="blog-likes">
//           <p>{likeCount}</p>
//           <img src={likeIcon} alt="Like" className="like-icon" style={{ height: "20px" }} />
//         </div>
//         {tags && tags.length > 0 && (
//           <div className="blog-tags">
//             {tags.map((tag, index) => (
//               <span key={index} className="blog-tag">{tag}</span>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="blog-comments">
//         <h2>Comments</h2>
//         {comments.map(comment => (
//           <div key={comment.commentId} className="comment">
//             <p><strong>{comment.user.username}:</strong> {comment.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogPage;