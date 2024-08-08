import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import  VerifyOTP from './components/VerifyOTP'
import Login from './components/login';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <div>
        <h1>FastAPI + React App</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
