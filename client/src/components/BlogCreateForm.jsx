import React, { useState } from 'react';
import axios from 'axios';

const BlogCreateForm = ({ onSubmit, onCancel }) => {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const token = localStorage.getItem('accessToken');

    const handleSubmit = (e) => {
        e.preventDefault();


        const blogData = {
            text,
            tags
        };

        axios.post('http://localhost:3000/blog/createBlog', blogData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Blog created:', response.data);
            onSubmit(); // Optionally handle success in parent component
        })
        .catch(error => {
            console.error('Error creating blog:', error);
            // Handle error feedback to user if needed
        });
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label>
                Text:<br />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows="5"
                    placeholder="Write your blog here..."
                />
            </label><br />
            <label>
                Tags:<br />
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags separated by space"
                />
            </label><br />
            <button type="submit">Create Blog</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default BlogCreateForm;
