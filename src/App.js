import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatDashboard from './components/Chat/ChatDashboard';
import ChatWindow from './components/Chat/ChatWindow';
import { CssBaseline } from '@mui/material';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ChatDashboard />} />
        <Route path="/chat/:id" element={<ChatWindow />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
