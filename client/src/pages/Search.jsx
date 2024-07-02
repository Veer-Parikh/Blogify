import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Blog from '../components/Blogs.jsx'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading
    const [blogs, setBlogs] = useState([]);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (searchTerm && token) { // Ensure token exists before making the request
            // Add a delay to debounce the API call
            const delayDebounceFn = setTimeout(() => {
                setIsLoading(true);
                axios.get(`http://localhost:3000/blog/search/${searchTerm}`, {
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
                    <Blog key={blog.blogId} blog={blog} />
                ))}
            </div> 
        </div>
    )
}

export default Search;
