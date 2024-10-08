import React, { useState } from 'react';
import axios from 'axios';
import input from "../assets/input.png";
import { Snackbar, Alert } from '@mui/material';

const BlogCreateForm = ({ onSubmit, onCancel }) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]); // Array to hold selected images
    const [blogId, setBlogId] = useState(null); // Store the blogId of the created blog
    const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
    const token = localStorage.getItem('accessToken');

    const handleImageChange = (e) => {
        setImages([...e.target.files]); // Update state with selected images
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = { text, tags, title };

        try {
            // Create the blog
            const response = await axios.post('{{url}}/blog/createBlog', blogData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Blog created:', response.data);
            setBlogId(response.data.blogId); // Store the created blog's blogId

            // Optionally handle success in parent component and show upload button
            setTimeout(() => {
                onSubmit();
                // onCancel();
            }, 1000);
            setSnackbar({ open: true, severity: 'success', message: 'Blog created successfully! You can now upload images.' });

        } catch (error) {
            console.error('Error creating blog:', error);
            setSnackbar({ open: true, severity: 'error', message: 'Error creating blog' });
        }
    };

    const handleImageUpload = async () => {
        if (!blogId) {
            setSnackbar({ open: true, severity: 'error', message: 'Create a blog first before uploading images.' });
            return;
        }

        if (images.length === 0) {
            setSnackbar({ open: true, severity: 'error', message: 'Please select images to upload.' });
            return;
        }

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append('image', image); // Append images under the 'image' field name
        });

        // Include blogId in the formData
        formData.append('blogBlogId', blogId); // Align with the backend expected field name

        try {
            // Send images to the server
            await axios.post('{{url}}/image/uploadImages', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Images uploaded successfully');
            setSnackbar({ open: true, severity: 'success', message: 'Images uploaded successfully!' });
            setTimeout(() => {
                onCancel();
            }, 3000)
            setImages([]); // Clear selected images after successful upload

        } catch (error) {
            console.error('Error uploading images:', error);
            setSnackbar({ open: true, severity: 'error', message: 'Error uploading images' });
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <label>
                Title:<br />
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Write your title here..."
                />
            </label><br />
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
            <div className='button'>
                <button style={{ backgroundColor: "lightgreen" }} type="submit">Create Blog</button>
                <button style={{ backgroundColor: "pink" }} type="button" onClick={onCancel}>Cancel</button>
            </div>
            {blogId && (
                <div className="upload-container">
                    <input
                        type="file"
                        id='file'
                        multiple
                        onChange={handleImageChange}
                    />
                    <label htmlFor='file'>
                        <img src={input} alt="Add Avatar" />
                        <span>Add images/pdf</span>
                    </label>
                    <button
                        type="button"
                        onClick={handleImageUpload}
                    >
                        Upload
                    </button>
                </div>
            )}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default BlogCreateForm;
