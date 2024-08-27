// // src/components/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     age: 0,
//     email: '',
//     password: ''
//   });

//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const navigate = useNavigate();

//   // Handle changes to text inputs
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle changes to the file input
//   const handleFileChange = (e) => {
//     setProfilePhoto(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const age = parseInt(formData.age, 10);

//     const userData = new FormData();
//     userData.append('username', formData.username);
//     userData.append('age', age);
//     userData.append('email', formData.email);
//     userData.append('password', formData.password);

//     // Append the profile photo if it exists
//     if (profilePhoto) {
//       userData.append('image', profilePhoto);
//     }

//     try {
//       const response = await axios.post('{{url}}/user/signup', userData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       //toast.success('Signup successful! Welcome ' + formData.username);

//       // Redirect to login page after 2 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       //toast.error('Signup failed: ' + (error.response.data.error || error.message));
//     }
//   };

//   return (
//     <div className='parent'>
//       <div className='signup'>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
//           <h1>SignUp</h1>
//           <label className='field'>Username</label>
//           <input 
//             type="text" 
//             name="username" 
//             value={formData.username} 
//             onChange={handleChange} 
//             required 
//           />
//           <label className='field'>Age</label>
//           <input 
//             type="number" 
//             name="age" 
//             value={formData.age} 
//             onChange={handleChange} 
//             required 
//           />
//           <label className='field'>Email</label>
//           <input 
//             type="email" 
//             name="email" 
//             value={formData.email} 
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
//           <label className='field'>Profile Photo (Optional)</label>
//           <input 
//             type="file" 
//             accept="image/*" 
//             onChange={handleFileChange} 
//           />
//           <button type="submit">Sign Up</button>
//           {/* <button type="submit" >Already have an account? Sign In</button> */}
//           <Link to="/login" style={{font:"20px",fontFamily:"sans-serif",marginTop:"10px"}}>
//           <button style={{fontSize: "15px"}}>Already have an account? Sign In</button>
//           </Link>
//         </form>
//         {/* <ToastContainer />  */}
//       </div>
//     </div>
//   );
// };

// export default SignUp;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Snackbar, Alert } from '@mui/material';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     age: 0,
//     email: '',
//     password: ''
//   });

//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setProfilePhoto(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const age = parseInt(formData.age, 10);

//     const userData = new FormData();
//     userData.append('username', formData.username);
//     userData.append('age', age);
//     userData.append('email', formData.email);
//     userData.append('password', formData.password);

//     if (profilePhoto) {
//       userData.append('image', profilePhoto);
//     }

//     try {
//       const response = await axios.post('{{url}}/user/signup', userData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSnackbar({ open: true, severity: 'success', message: 'Signup successful! Welcome ' + formData.username });

//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       setSnackbar({ open: true, severity: 'error', message: 'Signup failed: ' + (error.response?.data?.error || error.message) });
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <div className='parent'>
//       <div className='signup'>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
//           <h1>SignUp</h1>
//           <label className='field'>Username</label>
//           <input 
//             type="text" 
//             name="username" 
//             value={formData.username} 
//             onChange={handleChange} 
//             required 
//           />
//           <label className='field'>Age</label>
//           <input 
//             type="number" 
//             name="age" 
//             value={formData.age} 
//             onChange={handleChange} 
//             required 
//           />
//           <label className='field'>Email</label>
//           <input 
//             type="email" 
//             name="email" 
//             value={formData.email} 
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
//           <label className='field'>Profile Photo (Optional)</label>
//           <input 
//             type="file" 
//             accept="image/*" 
//             onChange={handleFileChange} 
//           />
//           <button type="submit">Sign Up</button>
//           <Link to="/login" style={{ font: "20px", fontFamily: "sans-serif", marginTop: "10px" }}>
//             <button style={{ fontSize: "15px" }}>Already have an account? Sign In</button>
//           </Link>
//         </form>
//         <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    age: 0,
    email: '',
    password: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = parseInt(formData.age, 10);

    const userData = new FormData();
    userData.append('username', formData.username);
    userData.append('age', age);
    userData.append('email', formData.email);
    userData.append('password', formData.password);

    if (profilePhoto) {
      userData.append('image', profilePhoto);
    }

    try {
      const response = await axios.post('{{url}}/user/signup', userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSnackbar({ open: true, severity: 'success', message: 'Signup successful! Welcome ' + formData.username });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setSnackbar({ open: true, severity: 'error', message: 'Signup failed: ' + (error.response?.data?.error || error.message) });
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
          <h1>SignUp</h1>
          <label className='field'>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
          <label className='field'>Age</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required 
          />
          <label className='field'>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
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
          <label className='field'>Profile Photo (Optional)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <button type="submit">Sign Up</button>
          <Link to="/login" style={{ font: "20px", fontFamily: "sans-serif", marginTop: "10px" }}>
            <button style={{ fontSize: "15px" }}>Already have an account? Sign In</button>
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

export default SignUp;
