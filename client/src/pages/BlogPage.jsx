// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { formatDistanceToNow } from 'date-fns';
// import placeholder from "../assets/placeholder.jpg";
// import likeIcon from "../assets/like.png";
// import unlikeIcon from "../assets/unlike.png";
// import Navbar from '../components/Navbar';
// import blank from "../assets/send-button.png";
// import deleteIcon from "../assets/trash.png"; // Ensure this path is correct

// const BlogPage = () => {
//   const { blogId } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [likeLoading, setLikeLoading] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const token = localStorage.getItem("accessToken");
//   const userId = localStorage.getItem('userId');
//   // const username = localStorage.getItem('username');

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/blog/blog/${blogId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setBlog(response.data);
//         setLikeCount(response.data.likedBy ? response.data.likedBy.length : 0);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch blog details');
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [blogId, token]);

//   useEffect(() => {
//     const checkLikeStatus = async () => {
//       try {
//         if (!token) {
//           throw new Error('Authorization token is missing');
//         }
//         const response = await axios.get(
//           `http://localhost:3000/blogLike/check/${blogId}/${userId}`
//         );
//         setIsLiked(response.data.isLiked);
//       } catch (error) {
//         console.error('Error checking like status:', error);
//       }
//     };

//     checkLikeStatus();
//   }, [blogId, userId, token]);

//   const handleLike = async () => {
//     try {
//       setLikeLoading(true);
//       if (!token) {
//         throw new Error('Authorization token is missing');
//       }
//       const response = await axios.post(
//         `http://localhost:3000/blogLike/createBlogLike/${blogId}`,
//         { userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setIsLiked(true);
//         setLikeCount(likeCount + 1);
//       } else {
//         throw new Error('Failed to like blog');
//       }
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   const handleSend = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/comment/createComment', {
//         text: commentText,
//         blogId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}` // Adjust if you're using a different way to store tokens
//         }
//       });
//       console.log('Comment created successfully:', response.data);
//       setCommentText(''); // Clear the input field after sending the comment
//       setBlog(prevBlog => ({
//         ...prevBlog,
//         comments: [...prevBlog.comments, response.data]
//       }));
//     } catch (error) {
//       console.error('Error creating comment:', error);
//     }
//   };

//   const handleUnlike = async () => {
//     try {
//       setLikeLoading(true);
//       if (!token) {
//         throw new Error('Authorization token is missing');
//       }

//       const response = await axios.delete(
//         `http://localhost:3000/blogLike/deleteBlogLike/${blogId}/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setIsLiked(false);
//         setLikeCount(likeCount - 1);
//       } else {
//         throw new Error('Failed to unlike blog');
//       }
//     } catch (error) {
//       console.error('Error unliking blog:', error);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:3000/comment/deleteComment/${commentId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log('Comment deleted successfully');
//       setBlog(prevBlog => ({
//         ...prevBlog,
//         comments: prevBlog.comments.filter(comment => comment.commentId !== commentId)
//       }));
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const { title, text, tags, user, createdAt, Images, comments } = blog;
//   const userProfileUrl = user?.profileUrl || placeholder;
//   // const username = user?.username || "";
//   const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

//   return (
//     <div>
//       <Navbar />
//       <div className="blog-details" style={{paddingTop:"100px",marginLeft:"20px",marginRight:"20px"}}>
//         <div className="blog-header">
//           <h1 style={{ fontWeight: 'bold' , color :"white" }}>{title}</h1>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <img src={userProfileUrl} className="user-profile-image" style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} />
//             <div>
//               {/* <p>{username}</p> */}
//               <p>{timeAgo}</p>
//             </div>
//             <div className="blog-likes" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
//               <p>{likeCount}</p>
//               {isLiked ? (
//                 <img src={likeIcon} alt="Unlike" onClick={handleUnlike} className="like-icon" style={{ height: "20px", marginLeft: '10px' }} disabled={likeLoading} />
//               ) : (
//                 <img src={unlikeIcon} alt="Like" onClick={handleLike} className="like-icon" style={{ height: "20px", marginLeft: '10px' }} disabled={likeLoading} />
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="blog-media">
//           {Images.map((image, index) => (
//             <div key={index} style={{ marginBottom: '10px' }}>
//               {image.url.endsWith('.pdf') ? (
//                 <iframe src={image.url} title={`Blog PDF ${index}`} className="blog-pdf" style={{ width: '100%', height: '500px' }} />
//               ) : (
//                 <img src={image.url} alt={`Blog Media ${index}`} className="blog-image" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="blog-content">
//           <pre>{text}</pre>
//         </div>
//         <hr style={{ margin: '20px 0' }} />
//         <div className="blog-comments" style={{flexDirection:"column",marginBottom:"20px",padding:"30px",backgroundColor:"black"}}>
//           <h2 style={{ marginLeft: "20px" }}>Comments</h2>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <input 
//               className='input-comment' 
//               value={commentText} 
//               onChange={(e) => setCommentText(e.target.value)} 
//             />
//             <img src={blank} style={{ width: "3%" }} onClick={handleSend} />
//           </div>
//           {comments.length > 0 ? (
//             comments.map(comment => (
//               <div key={comment.commentId} className="comment" style={{ marginBottom: '8px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' , backgroundColor : '#1e1e1e' , display:"flex" , alignItems:"center" , justifyContent:"space-between",marginLeft:"20px",marginRight:"20px"}}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <img src={comment.user.profileUrl || placeholder} alt={comment.user.username} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
//                   <p style={{width:"100px"}}><strong>{comment.user.username}</strong></p>
//                   <p>{comment.text}</p>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <p style={{ fontSize: '12px', color: '#555', marginRight: "20px" }}>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
//                   {comment.user.userId === userId && (
//                     <img 
//                       src={deleteIcon} 
//                       alt="Delete" 
//                       style={{ cursor: 'pointer', width: "20px", height: "20px" }} 
//                       onClick={() => handleDeleteComment(comment.commentId)} 
//                     />
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No comments on this blog yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;


// BlogPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import placeholder from "../assets/placeholder.jpg";
import likeIcon from "../assets/like.png";
import unlikeIcon from "../assets/unlike.png";
import Navbar from '../components/Navbar';
import blank from "../assets/send-button.png";
import deleteIcon from "../assets/trash.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
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
    setTimeout(() => {
      fetchBlog(); 
    },1000)
  }, [blog, token,]);

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

  const handleSend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/comment/createComment', {
        text: commentText,
        blogId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Adjust if you're using a different way to store tokens
        }
      });
      // console.log('Comment created successfully:', response.data);
      setCommentText(''); // Clear the input field after sending the comment
    } catch (error) {
      console.error('Error creating comment:', error);
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

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comment/deleteComment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Adjust if you're using a different way to store tokens
        }
      });
      // Refresh comments
      const updatedBlog = { ...blog };
      updatedBlog.comments = updatedBlog.comments.filter(comment => comment.commentId !== commentId);
      setBlog(updatedBlog);
    } catch (error) {
      console.error('Error deleting comment:', error);
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
      <div className="blog-details" style={{ paddingTop: "100px", marginLeft: "20px", marginRight: "20px" }}>
        <div className="blog-header">
          <h1 style={{ fontWeight: 'bold', color: "white" }}>{title}</h1>
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
        <center>
        <div className="blog-carousel" style={{width:"75%"}}>
          <Carousel showThumbs={true} dynamicHeight={true}>
            {Images.map((image, index) => (
              <div key={index}>
                {image.url.endsWith('.pdf') ? (
                  <iframe src={image.url} title={`Blog PDF ${index}`} className="blog-pdfs" style={{ width: '100%', height: '500px' }} />
                ) : (
                  <img src={image.url} alt={`Blog Media ${index}`} className="blog-images" style={{ width: '100%' ,maxHeight:"600px" , objectFit:"contain"}} />
                )}
              </div>
            ))}
          </Carousel>
        </div>        
        </center>
        <div className="blog-content">
          <pre>{text}</pre>
        </div>
        <hr style={{ margin: '20px 0' }} />
        <div className="blog-comments" style={{ flexDirection: "column", marginBottom: "20px", padding: "30px", backgroundColor: "black" }}>
          <h2 style={{ marginLeft: "20px" }}>Comments</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className='input-comment'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <img src={blank} style={{ width: "2.5%", marginBottom: "10px" }} onClick={handleSend} />
          </div>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.commentId} className="comment" style={{ marginBottom: '8px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#1e1e1e', display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "20px", marginRight: "20px" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={comment.user?.profileUrl || placeholder} alt={comment.user?.username || "Anonymous"} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
                  <p style={{ width: "100px" }}><strong>{comment.user?.username || "Anonymous"}</strong></p>
                  <p>{comment.text}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#555', marginRight: "20px" }}>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                  {comment.user?.userId === userId &&
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      style={{ cursor: 'pointer', width: "20px", height: "20px" }}
                      onClick={() => handleDeleteComment(comment.commentId)}
                    />}
                </div>
              </div>
            ))
          ) : (
            <p style={{marginLeft:"20px"}}>No comments on this blog yet.</p>
          )}
        </div>
        <div className="blog-tags" style={{ marginTop: "15px",display:"flex",justifyContent:"center"}}>
            {tags.map((tag, index) => (
              <span key={index} className="blog-tag">{tag}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

