import { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [selectedPoints, setSelectedPoints] = useState('totalpts');

  // Fetch leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPA}&select=id,username,totalpts,dailypts,weeklypts,monthlypts`);
        const data = await response.json();
        const mockData = [
          { id: 1, username: 'User1', totalpts: 100, dailypts:10, weeklypts: 10, monthlypts: 100 },
          { id: 2, username: 'User2', totalpts: 95, dailypts:8, weeklypts: 15, monthlypts: 90 },
          { id: 3, username: 'User3', totalpts: 90, dailypts:12, weeklypts: 20, monthlypts: 80 },
          { id: 4, username: 'User4', totalpts: 85, dailypts:9, weeklypts: 18, monthlypts: 75 },
          { id: 5, username: 'User5', totalpts: 80, dailypts:11, weeklypts: 22, monthlypts: 70 },
          { id: 6, username: 'User6', totalpts: 75, dailypts:7, weeklypts: 25, monthlypts: 65 },
          { id: 7, username: 'User7', totalpts: 70, dailypts:13, weeklypts: 30, monthlypts: 60 },
          { id: 8, username: 'User8', totalpts: 65, dailypts:10, weeklypts: 35, monthlypts: 55 },
          { id: 9, username: 'User9', totalpts: 60, dailypts:14, weeklypts: 40, monthlypts: 50 },
          { id: 10, username: 'User10', totalpts: 55, dailypts:6, weeklypts: 45, monthlypts: 45 }
        ];
        const mergedData = [...data, ...mockData];
        const sortedData = mergedData.sort((a, b) => parseInt(b[selectedPoints]) - parseInt(a[selectedPoints])).map(user => ({...user, totalpts: parseInt(user.totalpts), dailypts: parseInt(user.dailypts), weeklypts: parseInt(user.weeklypts), monthlypts: parseInt(user.monthlypts)}));
        setUsers(sortedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedPoints]);

  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">Top Green Contributors on Hawks Highway</div>
      <h2>Thank you all! 💖</h2>
      <label htmlFor="ranking-filter">Check ranking by: </label>
      <select id="ranking-filter" onChange={(e) => setSelectedPoints(e.target.value)}>
        <option value="totalpts">Total</option>
        <option value="dailyPts">Daily</option>
        <option value="weeklypts">Weekly</option>
        <option value="monthlypts">Monthly</option>
      </select>
      <table className='leaderboard-table'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>
                {index === 0 && <span className="gold-crown">👑</span>}
                {index === 1 && <span className="silver-crown">🥈</span>}
                {index === 2 && <span className="bronze-crown">🥉</span>}
                {index>2? index+1: null}
              </td>
              <td>{user.username}</td>
              <td>{parseInt(user[selectedPoints])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleShowAll} className="show-all-button">
        {showAll ? 'Show Top 10' : 'Show All'}
      </button>
      <div className="ranking-card">
        <h3>Your Ranking</h3>
        <div className="card-content">
          <p>Position: {isLoggedIn ? users.findIndex(user => user.username === 'CurrentUser') + 1 : "n/a"}</p>
          {!isLoggedIn ? (
          <>
            <p>You are observing, come join us!</p>
            <button onClick={() => window.location.href = '/login'}>Login</button>
          </>
        ) : (
          <p>Score: {users.find(user => user.name === 'CurrentUser')?.[selectedPoints]}</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;