import { useState, useEffect } from 'react';
import './Planner.css';


function Planner() {
  const [trips, setTrips] = useState([]);

  const generateRandomTrip = () => {
    return {
      distance: (Math.random() * 100).toFixed(1) + ' km',
      cost: '$' + (Math.random() * 50).toFixed(2),
      co2: (Math.random() * 20).toFixed(1) + ' kg',
      greenScore: Math.floor(Math.random() * 100),
      calories: Math.floor(Math.random() * 500)
    };
  };

  useEffect(() => {
    setTrips([generateRandomTrip(), generateRandomTrip(), generateRandomTrip()]);
  }, []);

  return (
    <div className="planner-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Plan Your Eco-Friendly Trip</h2>
      <div className="trip-form">
        <form>
          <input type="text" placeholder="Start Location" required />
          <input type="text" placeholder="Destination" required />
          <select required>
            <option value="">Select Transportation</option>
            <option value="walking">Walking</option>
            <option value="biking">Biking</option>
            <option value="public_transport">Public Transport</option>
            <option value="carpool">Carpool</option>
          </select>
          <button type="submit">Plan Trip</button>
        </form>
      </div>
      <div className="map-placeholder">
        <img src="https://picsum.photos/600/300" alt="Map placeholder" />
      </div>
      <div className="trip-recommendations">
        <h3>Recommended Trips</h3>
        
        {trips.map((trip, index) => (
          <div key={index} className="trip-card">
            <p>Distance: {trip.distance}</p>
            <p>Cost: {trip.cost}</p>
            <p>CO2 Saved: {trip.co2}</p>
            <p>Green Score: {trip.greenScore}</p>
            <p>Calories Burned: {trip.calories}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;