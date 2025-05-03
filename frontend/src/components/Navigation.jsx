import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/planner" className={({ isActive }) => isActive ? 'active' : ''}>Planner</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'active' : ''}>Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login/Signup</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;