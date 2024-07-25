import React, { useEffect, useState } from 'react';
import axios from 'axios';
import blankProfileImage from '../assets/blank.webp';
import Navbar from './Navbar';
import Modal from './Modal';
import BlogCreateForm from './BlogCreateForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfData = () => {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

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

    const handleBlogCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleBlogSubmit = () => {
        // const token = localStorage.getItem('accessToken');
        // const formData = new FormData();
        // formData.append('text', blogData.text);
        // formData.append('tags', blogData.tags);
        // if (blogData.image) {
        //     formData.append('image', blogData.image);
        // }

        // axios.post('http://localhost:3000/blog/createBlog', formData, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        // })
        // .then(response => {
        //     // Handle successful blog creation
        //     console.log('Blog created:', response.data);
        //     setIsModalOpen(false);
        // })
        // .catch(error => {
        //     console.error("There was an error creating the blog!", error);
        // });
        //toast.success('Blog created successfully')

    };

    setTimeout(()=>{
        localStorage.setItem("userId",userData.userId)
        localStorage.setItem("age",userData.age)
    },2000)

    if (!userData) {
        return <h3>Loading...</h3>;
    }

    return (
        <>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '130px' }}>
            <div className='container'>
                <div className='username'>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                        <img 
                            src={userData.profileUrl || blankProfileImage} 
                            alt="Profile"
                            style={{ width: "250px", height: "250px", borderRadius: "50%", paddingTop: "60px", paddingLeft: "30px" }}
                        />
                        <button 
                            onClick={handleBlogCreate} 
                            style={{ padding: "20px", marginLeft: "30px", border: "none", fontFamily: "sans-serif", fontSize: "20px", color: "white" }}
                        >
                            Create new Blog
                        </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "70%", fontFamily: "sans-serif", flexWrap: "revert" }}>
                        <div className='col1' style={{ width: "40%", display: "flex", flexDirection: "column" }}>
                            <h3>Username</h3>
                            <h4 style={{ backgroundColor: "white", padding: "15px", width: "100%", border: "solid 1px" }}>{userData.username}</h4>
                            <hr></hr>
                            <h3>No. of blogs</h3>
                            <h4 style={{ backgroundColor: "white", padding: "15px", width: "100%", border: "solid 1px" }}>{userData.blogs.length}</h4>
                            <hr></hr>
                            <h3>Followers</h3>
                            <h4 style={{ backgroundColor: "white", padding: "15px", width: "100%", border: "solid 1px" }}>{userData.followers.length}</h4>
                        </div>
                        <div className='col2' style={{ width: "40%", display: "flex", flexDirection: "column" }}>
                            <h3>Email</h3>
                            <h4 style={{ backgroundColor: "white", padding: "15px", width: "100%", border: "solid 1px", overflow: "hidden" }}>{userData.email}</h4>
                            <hr></hr>
                            <h3>Age</h3>
                            <h4 style={{ backgroundColor: "white", padding: "15px", width: "100%", border: "solid 1px" }}>{userData.age}</h4>
                            <hr></hr>
                            <h3>Following</h3>
                            <h4 style={{ backgroundColor: "white", padding: "15px", width: "100%", border: "solid 1px" }}>{userData.following.length}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal isVisible={isModalOpen} onClose={handleCloseModal}>
            <BlogCreateForm 
                onSubmit={handleBlogSubmit} 
                onCancel={handleCloseModal} 
            />
        </Modal>
        {/* <ToastContainer /> */}
        </>
    );
};

export default ProfData;
