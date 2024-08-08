import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {                                                      
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // 1 for login, 2 for OTP verification
  const navigate = useNavigate(); // Using useNavigate instead of redirect

  const handleLogin = async () => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/users/token', params);
      if (response.data.message) {
        setMessage(response.data.message);
        setStep(2); // Move to OTP verification step
      } else {
        localStorage.setItem('token', response.data.access_token);
        setMessage('Login successful');
        // Redirect to profile or dashboard page
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/users/login/verify-otp?email=${email}`, // email as a query parameter
        { email,otp } // otp as body parameter
        );
      localStorage.setItem('token', response.data.access_token);
      setMessage('OTP verified successfully');
      // Redirect to profile or dashboard page
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      setMessage('OTP verification failed: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div>
      <h2>{step === 1 ? 'Login' : 'Verify OTP'}</h2>
      {step === 1 ? (
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
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <input 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="Enter OTP" 
            required 
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
