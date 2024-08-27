import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Blog from '../components/Blogs.jsx'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading
    const [blogs, setBlogs] = useState([]);

    const token = localStorage.getItem('accessToken');
    const currentUsername = localStorage.getItem('username');


    const handleLike = async (blogId) => {
        try {
          axios.post(`{{url}}/blogLike/createBlogLike/${blogId}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          // Update the blogs state to reflect the like
          setBlogs(prevBlogs => prevBlogs.map(blog => 
            blog.blogId === blogId ? { ...blog, likedBy: [...blog.likedBy, { userId: 'currentUserId' }] } : blog
          ));
        } catch (error) {
          console.error('Error liking blog:', error);
        }
      };

    useEffect(() => {
        if (searchTerm && token) { // Ensure token exists before making the request
            // Add a delay to debounce the API call
            const delayDebounceFn = setTimeout(() => {
                setIsLoading(true);
                axios.get(`{{url}}/blog/search/${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    setBlogs(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the user data!", error);
                    setIsLoading(false);
                });
            }, 500); // Delay of 500ms

            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchTerm, token]); 

    const handleDelete = (blogId) => {
        setBlogs(blogs.filter(blog => blog.blogId !== blogId));
        //toast.success('Blog deleted successfully.');
      };

    return (
        <div>
            <Navbar />
            
            <div className='searchbar'>
                <input 
                    type="text" 
                    placeholder='Search for Blog or BlogTags'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            <div className="blogs">
                {blogs.map(blog => (
                    <Blog key={blog.blogId} blog={blog} onDelete={handleDelete} onLike={handleLike} visible={blog.user.username === currentUsername ? 'block' : 'none'} />
                ))}
            </div> 
            {/* <ToastContainer /> */}
        </div>
    )
}

export default Search;
