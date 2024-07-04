import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Blog from '../components/Blogs.jsx'
import axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    // Fetch blog data from your API
    axios.get('http://localhost:3000/blog/blogFollow',{
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
        <h1 style={{color:"white"}}>LATEST BLOGS OF FOLLOWERS</h1>
        <div className="blogs">
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
