import { HashRouter as Router, Link, useHistory } from 'react-router-dom';
import './Header.css';

function Header() {
  const history = useHistory();
  return (
    <Router>
      <header>
        <h1>The Movies Saga!</h1>
        {/* handy little home button for every page */}
        <Link to="/">
          <button className="btn">Home</button>
        </Link>
        <Link to="/addMovie">
          <button className="btn">Add Movie</button>
        </Link>
        <Link to="/admin">
          <button className="btn">Admin</button>
        </Link>
      </header>
    </Router>
  );
}

export default Header;
