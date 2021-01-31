import { HashRouter as Router, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <Router>
      <header>
        <h1>The Movies Saga!</h1>
        {/* handy little home button for every page */}
        <Link to="/"><button>Home</button></Link>
      </header>
    </Router>
  );
}

export default Header;
