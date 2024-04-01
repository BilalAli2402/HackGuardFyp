import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../AuthContext'; // Make sure the path is correct

function Navbar() {
  const { authState, login, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className='nav-item-container'>
        <div className="nav-item">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-item">
          <Link to="/ethicalhacking">EthicalHacking</Link>
        </div>
        <div className="nav-item">
          <Link to="/footprinting">FootPrinting</Link>
        </div>
        <div className="nav-item">
          <Link to="/socialengineering">SocialEngineering</Link>
        </div>
        <div className="nav-item">
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
        {authState['isLoggedIn'] &&
          <>
            <div className="nav-item">
              {authState['role'] === "Admin" && (
                <Link to="/add-questions">Add Questions</Link>
              )}
            </div>
            <div className="nav-item">
              <Link to="/quiz">Quiz</Link> {/* Quiz link for logged-in users */}
            </div>
          </>
        }
      </div>
      <div className='nav-item-container'>
        <>
          {authState['isLoggedIn'] &&
            <>
              <div className='username'>
                {authState['username']}
              </div>
              <div className="nav-item">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          }
          {!authState['isLoggedIn'] &&
            <>
              <div className="nav-item">
                <Link to="/login">Login</Link>
              </div>
              <div className="nav-item">
                <Link to="/signup">Signup</Link>
              </div>
            </>
          }
        </>
      </div>
    </nav>
  );
}

export default Navbar;