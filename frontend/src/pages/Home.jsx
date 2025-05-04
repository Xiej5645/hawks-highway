import './Home.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-container">
      <h1 id='home-title'>Welcome to Hawks Highway</h1>
      <div className="both-sections">
        <div className="mission-column mission-section">
          <h2>Our Mission</h2>
          <p>
            At Hawk's Highway, we're committed to reducing carbon footprints through
            intelligent, eco-conscious travel planning. Join us in creating a greener
            planet, one trip at a time.
          </p>
        </div>
        <div className="hero-column hero-section">
          <h1>Your Journey, Our Planet</h1>
          <p className="hero-text">
            Hawk's Highway - Redefining travel for a sustainable future
          </p>

          <button className="cta-button" onClick={() => navigate('/planner')}>Start Your Eco-Friendly Journey</button>
        </div>
      </div>
      <div className="features-section">
        <div className="feature">
          <h3>Eco-Friendly Routes</h3>
          <p>Discover the greenest paths for your daily commute</p>
        </div>
        <div className="feature">
          <h3>Cost-Effective Travel</h3>
          <p>Save money while saving the planet</p>
        </div>
        <div className="feature">
          <h3>Real-Time Data</h3>
          <p>Get up-to-date information for smarter decisions</p>
        </div>
      </div>
    </div>
  );
}