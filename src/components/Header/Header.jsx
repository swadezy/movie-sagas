import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();

  return (
    <header>
      <h1>The Movies Saga!</h1>
      {/* handy little home button for every page */}
      <button onClick={() => {history.push('/')}}>Home</button>
    </header>
  );
}

export default Header;
