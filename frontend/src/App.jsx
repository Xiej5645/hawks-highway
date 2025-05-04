import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react';
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
  )
}

export default App
