import { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  // Fetch leaderboard data
  useEffect(() => {
    // TODO: To Be Replace with actual API call
    const mockData = [
      { id: 1, name: 'User1', score: 100 },
      { id: 2, name: 'User2', score: 90 },
      { id: 3, name: 'User3', score: 80 },
    ];
    setUsers(mockData);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
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
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;