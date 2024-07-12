import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from '../components/Blogs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blog/myBlogs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Error fetching blogs.');
      }
    };

    fetchBlogs();
  }, [token]);

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog.blogId !== blogId));
    toast.success('Blog deleted successfully.');
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}>
      <div className='container'>
        <h1>MY BLOGS</h1>
        <div className="blogs">
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfBlog;


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Blog from '../components/Blogs.jsx'
// import { Toast } from 'bootstrap';
// import { ToastContainer } from 'react-toastify';

// const ProfBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const token = localStorage.getItem('accessToken')

//   useEffect(() => {
//     // Fetch blog data from your API
//     axios.get('http://localhost:3000/blog/myBlogs',{
//       headers:{
//         Authorization:`Bearer ${token}`
//       }
//     })
//       .then(response => setBlogs(response.data))
//       .catch(error => console.error('Error fetching blogs:', error));
//   }, [blogs]);
//   return (
//     <div style={{display:"flex",justifyContent:"center",paddingTop:"40px"}}>
//         <div className='container'>
//         <h1>MY BLOGS</h1>
//         <div className="blogs">
//           {blogs.map(blog => (
//             <Blog key={blog.blogId} blog={blog} />
//           ))}
//         </div>  
//         </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default ProfBlog
