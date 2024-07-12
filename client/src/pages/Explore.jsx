import React, {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Blog from '../components/Blogs';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Explore = () => {

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
      <div className="homepage" style={{paddingTop:"100px",display:'flex',flexDirection:"column",alignItems:"center",width:"100%"}}>
        <h1 style={{color:"white"}}>EXPLORE THE RECENT MOST LIKED BLOGS</h1>
        <div className="blogs">
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Explore
