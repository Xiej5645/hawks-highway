import './Home.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export default function Home() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate()
  return (
    <div className="home-container">
        {isLoggedIn ? (
        <h1 id='home-title'>Thanks for joining us!</h1>
      ) : (
        <h1 id='home-title'>Welcome to Hawks Highway</h1>
      )}
      <div className="both-sections">

        <div className="hero-column hero-section">
          <h1>Your Journey, Our Planet</h1>
          <p className="hero-text">
            Hawk's Highway - Redefining travel for a sustainable future
          </p>

          <button className="cta-button" onClick={() => navigate('/planner')}>Start Your Greener Journey!</button>
          {isLoggedIn && <button className="cta-button" onClick={() => navigate('/leaderboard')}>Check out your stats!</button>}
        </div>
      </div>
      <div className="mission-column mission-section">
        <h2>Our Mission</h2>
        <p>
          At Hawk's Highway, we're committed to reducing carbon footprints through
          intelligent, eco-conscious travel planning. Join us in creating a greener
          planet, one trip at a time.
        </p>
      </div>
      <div className="features-section">
        <div className="feature">
          <h3>Eco-Friendly Routes</h3>
          <p>Discover the greenest paths for your daily commute.</p>
        </div>
        <div className="feature">
          <h3>Cost-Effective Travel</h3>
          <p>Save money while saving the planet.</p>
        </div>
        <div className="feature">
          <h3>Real-Time Data</h3>
          <p>Get up-to-date information for smarter decisions, and share your optimized commute with others!</p>
        </div>
      </div>
    </div>
  );
}