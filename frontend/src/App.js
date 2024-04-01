import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import AddQuestions from './components/AddQuestion';
import GetQuiz from './components/GetQuiz';
import EthicalHacking from './components/EthicalHacking';
import SocialEngineering from './components/SocialEngineering';
import FootPrinting from './components/FootPrinting';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/ethicalhacking" element={<EthicalHacking isLoggedIn={isLoggedIn} />} />
        <Route path="/footprinting" element={<FootPrinting isLoggedIn={isLoggedIn} />} />
        <Route path="/socialengineering" element={<SocialEngineering isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/quiz" element={<GetQuiz />} />
      </Routes>
    </>
  );
}

export default App;
