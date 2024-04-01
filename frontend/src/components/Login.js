import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../api/axiosInstance';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('login/', { email, password });
      const { access, refresh, roles, username } = response.data;
      login(access, refresh, roles[0], username); // Update login state globally
      navigate('/'); // Redirect to the home page without reloading the app
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
