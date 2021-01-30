import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie'
import EditMovie from '../EditMovie/EditMovie'

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        {/* home page is movie list */}
        <Route path="/" exact component={MovieList} />
        {/* details and edit pages route to dedicated ids */}
        <Route path="/details/:id" component={Details} />
        <Route path="/edit/:id" component={EditMovie} />
        {/* add movie page */}
        <Route path="/addMovie" component={AddMovie} />
      </Router>
    </div>
  );
}

export default App;
