// // src/components/SignIn.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   // Handle changes to text inputs
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send POST request to login endpoint
//       const response = await axios.post('{{url}}/user/login', {
//         username: formData.username,
//         password: formData.password
//       });

//       // Assuming the response contains the access token
//       const token = response.data;
//       localStorage.setItem('accessToken', token);
//       localStorage.setItem('username', formData.username)

//       //toast.success('Login successful! Redirecting to dashboard...');
//       // setTimeout(() => {
//         navigate('/dashboard'); // Redirect to the dashboard or another page
//       // }, 2000);
//     } catch (error) {
//       //toast.error('Login failed: ' + (error.response?.data || error.message));
//     }
//   };

//   return (
//     <div className='parent'>
//       <div className='signup'>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
//           <h1>SignIn</h1>
//           <label className='field'>Username</label>
//           <input 
//             type="text" 
//             name="username" 
//             value={formData.username} 
//             onChange={handleChange} 
//             required 
//           />
//           <label className='field'>Password</label>
//           <input 
//             type="password" 
//             name="password" 
//             value={formData.password} 
//             onChange={handleChange} 
//             required 
//           />
//           <button style={{marginTop:"20px"}} type="submit">Sign In</button>
//           {/* <button style={{marginTop:"20px"}} type="">Don't have an account? Sign Up</button> */}
//           <Link to="/">
//           <button style={{marginTop:"20px",fontSize:"15px"}} type="">Don't have an account? Sign Up</button>
//           </Link>
//         </form>
//         {/* <ToastContainer /> */}
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('{{url}}/user/login', {
        username: formData.username,
        password: formData.password
      });

      const token = response.data;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('username', formData.username);

      navigate('/dashboard');
      setSnackbar({ open: true, severity: 'success', message: 'Login successful!' });
    } catch (error) {
      setSnackbar({ open: true, severity: 'error', message: 'Login failed: ' + (error.response?.data || error.message) });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className='parent'>
      <div className='signup'>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <h1>SignIn</h1>
          <label className='field'>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
          <label className='field'>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <button style={{ marginTop: "20px" }} type="submit">Sign In</button>
          <Link to="/">
            <button style={{ marginTop: "20px", fontSize: "15px" }} type="">Don't have an account? Sign Up</button>
          </Link>
        </form>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignIn;
