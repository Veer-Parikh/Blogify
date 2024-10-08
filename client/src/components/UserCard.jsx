// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import defaultProfileImage from '../assets/blank.webp';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';

// const UserCard = ({ user }) => {
//   const blogCount = user.blogs ? (Array.isArray(user.blogs) ? user.blogs.length : user.blogs) : 0;
//   const initialFollowerCount = user.followers ? (Array.isArray(user.followers) ? user.followers.length : user.followers) : 0;
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [followerCount, setFollowerCount] = useState(initialFollowerCount);
//   const profileImage = user.profileUrl || defaultProfileImage;

//   useEffect(() => {
//     const checkFollowStatus = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (!token) {
//           throw new Error('Authorization token is missing');
//         }

//         const response = await axios.get(
//           `{{url}}/follow/checkFollow/${user.userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.isFollowing) {
//           setIsFollowing(true);
//         } else {
//           setIsFollowing(false);
//         }
//       } catch (error) {
//         console.error('Error checking follow status:', error);
//       }
//     };

//     checkFollowStatus();
//   }, [user.userId]); // Run this effect when the component mounts or when the user ID changes

//   const handleFollow = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         throw new Error('Authorization token is missing');
//       }

//       const response = await axios.post(
//         '{{url}}/follow/createFollow',
//         { followedId: user.userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         setIsFollowing(true);
//         setFollowerCount(followerCount + 1);
//         //toast.success(`You are now following ${user.username}`);
//       } else {
//         throw new Error('Failed to follow user');
//       }
//     } catch (error) {
//       console.error('Error following user:', error);
//       //toast.error('Error following user. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Retrieve the stored username from localStorage
//   const storedUsername = localStorage.getItem('username');

//   // Conditionally render the follow button based on whether it's the same user
//   const showFollowButton = storedUsername !== user.username;  

//   const handleUser = () => {
//     localStorage.setItem('user',user.username)
//   }

//   return (
//     <div className="user-card" onClick={handleUser}>
//       <Link  to={`/user`} style={{ textDecoration: 'none', color: 'inherit' }}>
//         <div style={{display:'flex',alignItems:"center"}}>
//           <img src={profileImage} alt={user.username} className="user-card-image" />
//           <div className="user-card-info">
//             <h2>{user.username}</h2>
//             <p>Email: {user.email}</p>
//             <p>Number of Blogs: {blogCount}</p>
//             <p>Number of Followers: {followerCount}</p>
//           </div>
//         </div>
//       </Link>
//       <div>
//       {showFollowButton && !isFollowing && (
//         <button onClick={handleFollow} className="follow-button" disabled={loading}>
//           {loading ? 'Following...' : 'Follow'}
//         </button>
//       )}
//       {showFollowButton && isFollowing && (
//         <button className="follow-button-follow">
//           Following
//         </button>
//       )}
//       </div>
//       {/* <ToastContainer /> */}
//     </div>
//   );
// };

// // Define the prop types for the component
// UserCard.propTypes = {
//   user: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     profileUrl: PropTypes.string,
//     blogs: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.object),
//       PropTypes.number
//     ]),
//     followers: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.object),
//       PropTypes.number
//     ]),
//   }).isRequired,
// };

// export default UserCard;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import defaultProfileImage from '../assets/blank.webp';
import { Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const blogCount = user.blogs ? (Array.isArray(user.blogs) ? user.blogs.length : user.blogs) : 0;
  const initialFollowerCount = user.followers ? (Array.isArray(user.followers) ? user.followers.length : user.followers) : 0;
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);
  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
  const profileImage = user.profileUrl || defaultProfileImage;

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Authorization token is missing');
        }

        const response = await axios.get(
          `{{url}}/follow/checkFollow/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isFollowing) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    checkFollowStatus();
  }, [user.userId]);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await axios.post(
        '{{url}}/follow/createFollow',
        { followedId: user.userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsFollowing(true);
        setFollowerCount(followerCount + 1);
        setSnackbar({ open: true, severity: 'success', message: `You are now following ${user.username}` });
      } else {
        throw new Error('Failed to follow user');
      }
    } catch (error) {
      console.error('Error following user:', error);
      setSnackbar({ open: true, severity: 'error', message: 'Error following user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const storedUsername = localStorage.getItem('username');
  const showFollowButton = storedUsername !== user.username;

  const handleUser = () => {
    localStorage.setItem('user', user.username);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="user-card" onClick={handleUser}>
      <Link to={`/user`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', alignItems: "center" }}>
          <img src={profileImage} alt={user.username} className="user-card-image" />
          <div className="user-card-info">
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Number of Blogs: {blogCount}</p>
            <p>Number of Followers: {followerCount}</p>
          </div>
        </div>
      </Link>
      <div>
        {showFollowButton && !isFollowing && (
          <button onClick={handleFollow} className="follow-button" disabled={loading}>
            {loading ? 'Following...' : 'Follow'}
          </button>
        )}
        {showFollowButton && isFollowing && (
          <button className="follow-button-follow">
            Following
          </button>
        )}
      </div>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileUrl: PropTypes.string,
    blogs: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.number
    ]),
    followers: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.number
    ]),
  }).isRequired,
};

export default UserCard;
