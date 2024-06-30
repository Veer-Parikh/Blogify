import React from 'react'
import mask from '../assets/mask.png'
import { useNavigate } from 'react-router-dom';
import profile from '../assets/people.png'

const Navbar = () => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('accessToken'); 
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
        navigate('/userSearch')
    }
    return (
        <div>
        <div className="navContainer">
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
                <img src={mask} style={{width:"65px"}}></img>
                <h2 onClick={handleHome}>BLOGIFY</h2>
                <h3 onClick={handleDashboard}>DASHBOARD</h3>
                <h3 onClick={handleExplore}>EXPLORE</h3>
                <h3 onClick={handleSearch}>SEARCH BLOGS</h3>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
                <img onClick={handleUserSearch} src={profile} style={{width:"45px"}} />
                <button onClick={handleSignOut}>SignOut</button>
            </div>
        </div>
        </div>
    )
}

export default Navbar
