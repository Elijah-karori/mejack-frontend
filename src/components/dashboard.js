import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://mejack-project.onrender.com/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        setMessage('Failed to fetch user data: ' + (error.response?.data?.detail || 'Unknown error'));
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {message && <p>{message}</p>}
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <p>Phone Number: {userData.phone_number}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
