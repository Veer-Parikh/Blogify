import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Blog from '../components/Blogs';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('accessToken');
  const currentUsername = localStorage.getItem('username');

  const handleLike = async (blogId) => {
    try {
      await axios.post(
        `{{url}}/blogLike/createBlogLike/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Update the blogs state to reflect the like
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.blogId === blogId
            ? { ...blog, likedBy: [...blog.likedBy, { userId: 'currentUserId' }] }
            : blog
        )
      );
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };
  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog.blogId !== blogId));
    setSnackbar({ open: true, severity: 'success', message: 'Blog deleted successfully.' });
  };

  useEffect(() => {
    // Fetch blog data from your API
    axios
      .get('{{url}}/blog/getAll', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error('Error fetching blogs:', error));
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="homepage" style={{ paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h1 style={{ color: 'white' }}>EXPLORE THE RECENT MOST LIKED BLOGS</h1>
        <div className="blogs">
          {blogs.map((blog) => (
            <Blog key={blog.blogId} blog={blog} visible={blog.user.username === currentUsername ? 'block' : 'none'} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Explore;
