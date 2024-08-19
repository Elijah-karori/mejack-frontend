import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyOTP from './VerifyOTP'; // Import VerifyOTP component

function Login() {                                                      
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // 1 for login, 2 for OTP verification
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/token`, params);
      if (response.data.message) {
        setMessage(response.data.message);
        setStep(2); // Move to OTP verification step
      } else {
        localStorage.setItem('token', response.data.access_token);
        setMessage('Login successful');
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.detail || 'Unknown error'));
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

export default Login;
