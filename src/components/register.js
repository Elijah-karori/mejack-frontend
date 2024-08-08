import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyOTP from './VerifyOTP'; // Import VerifyOTP component
  
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/register', { email, password, role });
      setMessage(response.data.message);
      setShowOtpVerification(true);
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.detail || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSuccess = (token) => {
    navigate('/dashboard');
  };

  const handleOtpFailure = (error) => {
    console.error('OTP verification failed', error);
  };

  return (
    <div>
      <h2>Register</h2>
      {!showOtpVerification ? (
        <>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </>
      ) : (
        <VerifyOTP 
          email={email} 
          onOtpSuccess={handleOtpSuccess} 
          onOtpFailure={handleOtpFailure} 
        />
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
