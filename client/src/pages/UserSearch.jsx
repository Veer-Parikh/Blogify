import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import UserCard from '../components/UserCard'; // Import the UserCard component

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setIsLoading(true);
      axios
        .get(`http://localhost:3000/user/search/${searchTerm}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response) => {
          setUserData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    } else {
      setUserData([]);
    }
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div className='searchbar'>
        <input
          type="text"
          placeholder='Search for User'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
        <div className='user-results'>
          {userData.length > 0 ? (
            userData.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))
          ) : (
            searchTerm && <div></div>
          )}
            <h2 style={{color:"white",fontFamily:"sans-serif"}}>No. of Users found : {userData.length}</h2>
        </div>
      
    </>
  );
};

export default UserSearch;
