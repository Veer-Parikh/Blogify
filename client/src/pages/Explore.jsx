import React, {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Blog from '../components/Blogs';
import axios from 'axios';

const Explore = () => {

  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    // Fetch blog data from your API
    axios.get('http://localhost:3000/blog/getAll',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="blogs" style={{paddingTop:"100px"}}>
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} />
          ))}
      </div> 
    </div>
  )
}

export default Explore
