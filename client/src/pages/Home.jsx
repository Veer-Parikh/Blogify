import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Blog from '../components/Blogs.jsx'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const token = localStorage.getItem('accessToken')

  const handleLike = async (blogId) => {
    try {
      axios.post(`http://localhost:3000/blogLike/createBlogLike/${blogId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      // Update the blogs state to reflect the like
      setBlogs(prevBlogs => prevBlogs.map(blog => 
        blog.blogId === blogId ? { ...blog, likedBy: [...blog.likedBy, { userId: 'currentUserId' }] } : blog
      ));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  useEffect(() => {
    // Fetch blog data from your API
    axios.get('http://localhost:3000/blog/blogs/blogFollow',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then(response => setBlogs(response.data))
      .catch(error => logger.error('Error fetching blogs:', error));
  }, []);
  console.log(blogs)
  return (
    <>
      <Navbar />
      <div className="homepage" style={{paddingTop:"100px",display:'flex',flexDirection:"column",alignItems:"center",width:"100%"}}>
        <h1 style={{color:"white"}}>LATEST BLOGS</h1><h3 style={{color:"white"}}>OF PEOPLE YOU FOLLOW</h3>
        <div className="blogs">
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} onLike={handleLike} visible={"none"} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
