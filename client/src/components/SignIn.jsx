// src/components/SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  // Handle changes to text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:3000/user/login', {
        username: formData.username,
        password: formData.password
      });

      // Assuming the response contains the access token
      const token = response.data;
      localStorage.setItem('accessToken', token);

      toast.success('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to the dashboard or another page
      }, 2000);
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data || error.message));
    }
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
          <button style={{marginTop:"20px"}} type="submit">Sign In</button>
          {/* <button style={{marginTop:"20px"}} type="">Don't have an account? Sign Up</button> */}
          <Link to="/">
          <button style={{marginTop:"20px",fontSize:"15px"}} type="">Don't have an account? Sign Up</button>
          </Link>
        </form>
        <ToastContainer /> {/* ToastContainer for displaying notifications */}
      </div>
    </div>
  );
};

export default SignIn;
