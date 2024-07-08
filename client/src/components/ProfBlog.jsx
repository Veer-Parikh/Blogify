import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from '../components/Blogs.jsx'

const ProfBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    // Fetch blog data from your API
    axios.get('http://localhost:3000/blog/myBlogs',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, [blogs]);
  return (
    <div style={{display:"flex",justifyContent:"center",paddingTop:"40px"}}>
        <div className='container'>
        <h1>MY BLOGS</h1>
        <div className="blogs">
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} />
          ))}
        </div>  
        </div>
    </div>
  )
}

export default ProfBlog
