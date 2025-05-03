import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <Router> 
    <div className="App">
      <div className="header">
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/page" element={<Page />} /> */}
      </Routes>
    </div>
  </Router>
  )
}

export default App
