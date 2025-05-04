import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home';
import LoginSignup from './components/LoginSignup';
import Leaderboard from './components/Leaderboard';
import Planner from './components/Planner';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';
import './App.css'

function App() {
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
