import React, { useEffect, useState } from 'react';
import axios from 'axios';
import blankProfileImage from '../assets/blank.webp';
import Navbar from '../components/Navbar';
import Blog from '../components/Blogs';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const username = localStorage.getItem('user');

        if (!token || !username) {
          throw new Error('User data is missing from localStorage.');
        }

        const response = await axios.get(`http://localhost:3000/user/user/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('There was an error fetching the user data!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  
  if (!userData) {
    return <h3>No user data found.</h3>;
  }

  const profileImage = userData.profileUrl || blankProfileImage;

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '130px' }}>
        <div className='container'>
          <div className='username'>
            <img src={profileImage} style={{ width: '250px', height: '250px', borderRadius: '50%', paddingTop: '60px', paddingLeft: '30px' }} alt="Profile" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '70%', fontFamily: 'sans-serif', flexWrap: 'revert' }}>
              <div className='col1' style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
                <h3>Username</h3>
                <h4 style={{ backgroundColor: 'white', padding: '15px', width: '100%', border: 'solid 1px' }}>{userData.username}</h4>
                <hr />
                <h3>No. of blogs</h3>
                <h4 style={{ backgroundColor: 'white', padding: '15px', width: '100%', border: 'solid 1px' }}>{userData.blogs?.length || 0}</h4>
                <hr />
                <h3>Followers</h3>
                <h4 style={{ backgroundColor: 'white', padding: '15px', width: '100%', border: 'solid 1px' }}>{userData.followers?.length || 0}</h4>
              </div>
              <div className='col2' style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
                <h3>Email</h3>
                <h4 style={{ backgroundColor: 'white', padding: '15px', width: '100%', border: 'solid 1px', overflow: 'hidden' }}>{userData.email}</h4>
                <hr />
                <h3>Age</h3>
                <h4 style={{ backgroundColor: 'white', padding: '15px', width: '100%', border: 'solid 1px' }}>{userData.age}</h4>
                <hr />
                <h3>Following</h3>
                <h4 style={{ backgroundColor: 'white', padding: '15px', width: '100%', border: 'solid 1px' }}>{userData.following?.length || 0}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
        <div className='container'>
          <h1>USER BLOGS</h1>
          <div className="blogs">
            {userData.blogs?.length > 0 ? (
              userData.blogs.map(blog => (
                <Blog key={blog.blogId} blog={blog} />
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;