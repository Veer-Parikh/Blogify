import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from '../components/Blogs';
import { Snackbar, Alert } from '@mui/material';

const ProfBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
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
        setSnackbar({ open: true, severity: 'error', message: 'Error fetching blogs.' });
      }
    };
    setTimeout(()=>{
      fetchBlogs();
    },1000)
  }, [token,blogs]);

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog.blogId !== blogId));
    setSnackbar({ open: true, severity: 'success', message: 'Blog deleted successfully.' });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px" , marginBottom:"40px"}}>
      <div className='container'>
        <h1>MY BLOGS</h1>
        <div className="blogs">
          {blogs.map(blog => (
            <Blog key={blog.blogId} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
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
