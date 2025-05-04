import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
<<<<<<< HEAD
import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext';
=======
import { useState } from 'react';
>>>>>>> e9ee5b66f479cb718e0a8a36a6a6781ed14e1290
import Home from './pages/Home';
import LoginSignup from './components/LoginSignup';
import Leaderboard from './components/Leaderboard';
import Planner from './components/Planner';
import Navigation from './components/Navigation';
import './App.css'

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [coordinates, setCoordinates] = useState({ origin: null, destination: null });
  return (
    <AuthProvider>
      <Router> 
      <div className="App">
      <div className="header">
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </div>
      </Router>
    </AuthProvider>
  )
}

export default App
