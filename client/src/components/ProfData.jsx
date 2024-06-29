import React, { useEffect, useState } from 'react'
import axios from 'axios'
import blankProfileImage from '../assets/blank.webp';

const ProfData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('accessToken');

        // Make the API request with the token in the Authorization header
        axios.get('http://localhost:3000/user/my', {
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
    }, []);

    if (!userData) {
        return <h3>Loading...</h3>;
    }

    if(userData.profileUrl == null){
        userData.profileUrl = blankProfileImage
    }
    
    return (
        <div style={{display:'flex',justifyContent:"center",paddingTop:"50px"}}>
            <div className='container'>
                <div className='username'>
                    <img src={userData.profileUrl} style={{width:"250px",height:"250px",borderRadius:"50%",paddingTop:"60px",paddingLeft:"30px"}}/>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",width:"70%"}}>
                        <div className='col1' style={{width:"40%"}}>
                            <h3>Username</h3>
                            <h4 style={{backgroundColor:"white",padding:"15px",width:"100%",border:"solid 1px"}}>{userData.username}</h4>
                            <hr></hr>
                            <h3>No. of blogs</h3>
                            <h4 style={{backgroundColor:"white",padding:"15px",width:"100%",border:"solid 1px"}}>{userData.blogs.length}</h4>
                            <hr></hr>
                            <h3>Followers</h3>
                            <h4 style={{backgroundColor:"white",padding:"15px",width:"100%",border:"solid 1px"}}>{userData.followers.length}</h4>
                        </div>
                        <div className='col2' style={{width:"40%"}}>
                            <h3>Email</h3>
                            <h4 style={{backgroundColor:"white",padding:"15px",width:"100%",border:"solid 1px"}}>{userData.email}</h4>
                            <hr></hr>
                            <h3>Age</h3>
                            <h4 style={{backgroundColor:"white",padding:"15px",width:"100%",border:"solid 1px"}}>{userData.age}</h4>
                            <hr></hr>
                            <h3>Following</h3>
                            <h4 style={{backgroundColor:"white",padding:"15px",width:"100%",border:"solid 1px"}}>{userData.following.length}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfData
