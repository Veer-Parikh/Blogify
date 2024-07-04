import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mask from '../assets/mask.png';
import profile from '../assets/people.png';
import blankProfileImage from '../assets/blank.webp';

const Navbar = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/home');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handleExplore = () => {
        navigate('/explore');
    };

    const handleSearch = () => {
        navigate('/search');
    };

    const handleUserSearch = () => {
        navigate('/userSearch');
    };

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:3000/user/my', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the user data!', error);
            });
        }
    }, [token]);

    // Render the navbar content conditionally based on userData
    return (
        <div className="navContainer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={mask} style={{ width: '65px' }} alt="Logo" />
                <h2 style={{cursor:"pointer"}} onClick={handleHome}>BLOGIFY</h2>
                <h3 onClick={handleDashboard}>DASHBOARD</h3>
                <h3 onClick={handleExplore}>EXPLORE</h3>
                <h3 onClick={handleSearch}>SEARCH BLOGS</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {userData ? (
                    <>
                        <img 
                            src={userData.profileUrl || blankProfileImage} 
                            alt="Profile" 
                            style={{ width: '45px',height:"50px", borderRadius: '50%' }} 
                        />
                        <img 
                            onClick={handleUserSearch} 
                            src={profile} 
                            alt="User Search Icon" 
                            style={{ width: '45px' }} 
                        />
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <p>Loading...</p> // Show a loading indicator while userData is being fetched
                )}
            </div>
        </div>
    );
};

export default Navbar;
