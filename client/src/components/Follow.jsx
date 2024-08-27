// src/components/Follow.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Follow = ({ type }) => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage

  useEffect(() => {
    axios.get('{{url}}/user/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the user data!", error);
    });
  }, [token]);

  if (!userData) {
    return <h3>Loading...</h3>;
  }

  const usersToDisplay = type === 'followers' ? userData.followers : userData.following;

  return (
    <div className="followContainer">
      
    </div>
  );
};

export default Follow;
