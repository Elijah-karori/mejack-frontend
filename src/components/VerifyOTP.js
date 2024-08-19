import React, { useState } from 'react';
import axios from 'axios';

function VerifyOTP({ email, onOtpSuccess, onOtpFailure }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login/verify-otp?email=${email}`, // email as a query parameter
        { email,otp } // otp as body parameter
        );
      localStorage.setItem('token', response.data.access_token);
      setMessage('OTP verified successfully');
      if (onOtpSuccess) {
        onOtpSuccess(response.data.access_token);
      }
    } catch (error) {
      setMessage('OTP verification failed: ' + (error.response?.data?.detail || 'Unknown error'));
      if (onOtpFailure) {
        onOtpFailure(error);
      }
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input 
        type="text" 
        value={otp} 
        onChange={(e) => setOtp(e.target.value)} 
        placeholder="Enter OTP" 
        required 
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VerifyOTP;
