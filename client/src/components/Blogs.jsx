import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {
  const { text, tags, user, createdAt, Images, likedBy } = blog;
  const media = Images || []; // Assume Images is an array of objects with 'url' property

  const username = user?.username || ""  
  return (
    <div className="blog">
      {media.length > 0 && (
        <div className="blog-media">
          {media.map((item, index) => (
            <div key={index} className={`blog-${item.type}`}>
              {item.url.endsWith('.pdf') ? (
                <iframe src={item.url} title={`Blog PDF ${index + 1}`} className="blog-pdf" />
              ) : (
                <img src={item.url} alt={`Blog Image ${index + 1}`} className="blog-image" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="blog-content">
        <p>{text}</p>
      </div>

      {tags && tags.length > 0 && (
        <div className="blog-tags">
          {tags.map((tag, index) => (
            <span key={index} className="blog-tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="blog-likes">
        <p>Likes: {likedBy ? likedBy.length : 0}</p>
      </div>

      {username && <div className="blog-header">
        <p>By {username} on {new Date(createdAt).toLocaleDateString()}</p>
      </div>}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    text: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      profileUrl: PropTypes.string
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    Images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })),
    likedBy: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default Blog;
