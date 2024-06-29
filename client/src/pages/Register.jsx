import React from 'react'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Register = () => {
    return (
      
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          {/* Other routes go here */}
        </Routes>
    );
  
}

export default Register
