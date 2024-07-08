import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogCreateForm = ({ onSubmit, onCancel }) => {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]); // Array to hold selected images
    const [blogId, setBlogId] = useState(null); // Store the blogId of the created blog
    const token = localStorage.getItem('accessToken');

    const handleImageChange = (e) => {
        setImages([...e.target.files]); // Update state with selected images
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = { text, tags };

        try {
            // Create the blog
            const response = await axios.post('http://localhost:3000/blog/createBlog', blogData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Blog created:', response.data);
            setBlogId(response.data.blogId); // Store the created blog's blogId

            // Optionally handle success in parent component and show upload button
            setTimeout(() => {
                onSubmit();
                // onCancel();
            }, 1000);
            toast.success('Blog created successfully! You can now upload images.');

        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Error creating blog');
        }
    };

    const handleImageUpload = async () => {
        if (!blogId) {
            toast.error('Create a blog first before uploading images.');
            return;
        }
    
        if (images.length === 0) {
            toast.error('Please select images to upload.');
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
            await axios.post('http://localhost:3000/image/uploadImages', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Images uploaded successfully');
            toast.success('Images uploaded successfully!');
            setTimeout(()=>{
                onCancel();
            },3000)
            setImages([]); // Clear selected images after successful upload
    
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Error uploading images');
        }
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
            <div className='button'>
                <button style={{ backgroundColor: "lightgreen" }} type="submit">Create Blog</button>
                <button style={{ backgroundColor: "pink" }} type="button" onClick={onCancel}>Cancel</button>
            </div>
            {blogId && (
                <>
                    <label>
                        Upload Images:<br />
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                        />
                    </label><br />
                    <button
                        type="button"
                        onClick={handleImageUpload}
                        style={{ backgroundColor: "lightblue" }}
                    >
                        Upload Images
                    </button>
                </>
            )}
            <ToastContainer />
        </form>
    );
};

export default BlogCreateForm;
