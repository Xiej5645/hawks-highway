import { useState, useEffect } from 'react';
import './Planner.css';

function Planner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);

  const GOOGLE_API_KEY = VITE_GOOGLE_MAPS_API_KEY || import.meta.VITE_GOOGLE_MAPS_API_KEY || VITE_GOOGLE_API_KEY || import.meta.VITE_GOOGLE_API_KEY || '(hidden)'; // Replace with your real key


  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    if (!data.results.length) throw new Error('Address not found');
    const { lat, lng } = data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setTrips([]);
      setIsLoading(true);
      const originCoords = await geocodeAddress(origin);
      const destinationCoords = await geocodeAddress(destination);
      const modes = ['WALK', 'BICYCLE', 'TRANSIT', 'DRIVE'];


      for (const travelMode of modes) {
        const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': '*'
          },
          body: JSON.stringify({
            origin: { location: { latLng: originCoords } },
            destination: { location: { latLng: destinationCoords } },
            travelMode: travelMode,
          })
        });
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const trip = {
            origin: `${originCoords.latitude}, ${originCoords.longitude}`,
            destination: `${destinationCoords.latitude}, ${destinationCoords.longitude}`,
            mode: travelMode === 'WALK' ? 'Walking' : 
                travelMode === 'BICYCLE' ? 'Bicycling' : 
                travelMode === 'TRANSIT' ? 'Transit' : 
                'Driving',
            distance: route.distanceMeters ? (route.distanceMeters / 1000).toFixed(1) + ' km' : 'N/A',
            cost: '$' + (Math.random()*100).toFixed(2), // Placeholder for cost calculation
            co2: (Math.random()*50).toFixed(1) + ' kg', // Placeholder for CO2 calculation
            greenScore: Math.floor(Math.random()*100), // Placeholder for green score
            calories: Math.floor(Math.random()*500) // Placeholder for calories
          };
          setTrips((prevTrips) => [...prevTrips, trip]);
        } else {
          console.log(data);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to plan trip:", error);
      alert("Failed to find route. Please check your locations.");
      setIsLoading(false);
    }
  };

  const handleTripClick = (trip) => {
    setCurrentTrip(trip);
  };

  return (
    <div className="planner-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Plan Your Trip</h2>
      <div className="trip-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Start Location"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <button type="submit">Plan Trip</button>
        </form>
      </div>

      <div className="map-container" style={{ height: '300px', margin: '20px 0' }}>
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=${encodeURIComponent(
            currentTrip ? currentTrip.origin : origin || 'New York City'
          )}&destination=${encodeURIComponent(
            currentTrip ? currentTrip.destination : destination || 'New Jersey'
          )}&mode=${currentTrip ? currentTrip.mode.toLowerCase() : 'driving'}`}
        ></iframe>
      </div>
      {isLoading && <p>Loading...</p>}

      <div className="trip-recommendations">
        <h3>Recommended Trips</h3>
        {trips.map((trip, index) => (
          <div
            key={index}
            className="trip-card"
            onClick={() => handleTripClick(trip)}
            style={{ cursor: 'pointer', border: currentTrip === trip ? '2px solid blue' : '1px solid gray' }}
          >
            <h4>Mode: {trip.mode}</h4>
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



