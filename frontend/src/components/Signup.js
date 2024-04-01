import React, { useState } from 'react';
import './Login.css'; // Assuming you have some CSS for styling
import axiosInstance from '../api/axiosInstance';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('signup/', {
        email,
        password,
        username,
        roles:[1]
      });
      console.log('Signup successful', response.data);
      // Handle signup success (e.g., redirecting to login page or auto-login)
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
