import { HashRouter as Router, Link } from 'react-router-dom';
import './Header.css';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// this component allows routing back home or to add movie from any page
function Header() {
  return (
    <Router>
      <header>
        <h1>The Movies Saga!</h1>
        {/* handy little home button for every page */}
        <Box m={1} display="inline">
          <Link to="/">
            <Button className="btn-padding" variant="contained" color="default">
              Home
            </Button>
          </Link>
        </Box>

        {/* handy little add movie button for every page */}
        <Box m={1} display="inline">
          <Link to="/addMovie">
            <Button className="btn-padding" variant="contained" color="default">
              Add Movie
            </Button>
          </Link>
        </Box>

        {/* handy little admin for every page */}
        <Box m={1} display="inline">
          <Link to="/admin">
            <Button className="btn-padding" variant="contained" color="default">
              Admin
            </Button>
          </Link>
        </Box>
      </header>
    </Router>
  );
}

export default Header;
