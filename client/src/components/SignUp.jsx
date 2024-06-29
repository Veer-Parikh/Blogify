// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    age: 0,
    email: '',
    password: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  // Handle changes to text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle changes to the file input
  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If a profile photo is selected, upload it first
    let uploadedPhotoUrl = '';
    if (profilePhoto) {
      const photoData = new FormData();
      photoData.append('image', profilePhoto);

      try {
        const response = await axios.post('http://localhost:3000/user/uploadpic', photoData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        uploadedPhotoUrl = response.data.secure_url;
      } catch (error) {
        toast.error('Failed to upload profile photo: ' + error.response.data.error);
        return;
      }
    }

    // After photo upload, proceed with the signup
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
        ...formData,
        age: parseInt(formData.age, 10), // Convert age to integer
        profileUrl: uploadedPhotoUrl // Only include profileUrl if a photo was uploaded
      });

      toast.success('Signup successful! Welcome ' + response.data.username);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error('Signup failed: ' + (error.response.data.error || error.message));
    }
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
        </form>
        <ToastContainer /> {/* ToastContainer for displaying notifications */}
      </div>
    </div>
  );
};

export default SignUp;
