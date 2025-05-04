import { useState, useEffect } from 'react';
import './Planner.css';
import { VURL } from '../config.jsx';


function Planner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);

  
  const [GOOGLE_API_KEY, setGoogleApiKey] = useState('');

  const getKey = async () => {
    const response = await fetch(`${VURL}&select=token,name`);
    const data = await response.json();
    setGoogleApiKey(data[0].token);
    if (!GOOGLE_API_KEY) {
      throw new Error('Google API key is missing. Please check your environment variables.');
    }
  }
  useEffect(() => {
    getKey();
  }, []);

  const geocodeAddress = async (address) => {
    if (!GOOGLE_API_KEY) {
      throw new Error('Google API key is missing. Please check your environment variables.');
    }
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
    const geocodeData = await geocodeResponse.json();
    if (!geocodeData.results.length) throw new Error('Address not found');
    const { lat, lng } = geocodeData.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  };

  const handleSubmit = async (e) => {
    if (!GOOGLE_API_KEY) {
      alert('Please wait while we initialize the API key');
      return;
    }
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
            cost: '$' + (Math.random() * 100).toFixed(2), // Placeholder for cost calculation
            co2: (Math.random() * 50).toFixed(1) + ' kg', // Placeholder for CO2 calculation
            greenScore: Math.floor(Math.random() * 100), // Placeholder for green score
            calories: Math.floor(Math.random() * 500) // Placeholder for calories
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
        { GOOGLE_API_KEY ? 
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
        ></iframe> : <><p>Invalid API</p><img alt="travel-img-placeholder" src="https://picsum.photos/600/300"/></>
        }
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



