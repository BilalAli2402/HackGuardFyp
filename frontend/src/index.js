import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider> {/* Wrap your app with AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
