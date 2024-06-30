// src/App.js or src/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Search from './pages/Search';
import './App.css'
import UserSearch from './pages/UserSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userSearch" element={<UserSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
