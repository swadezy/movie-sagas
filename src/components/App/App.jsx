import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import EditMovie from '../EditMovie/EditMovie';
import Admin from '../Admin/Admin';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        {/* home page is movie list */}
        <Route path="/" exact component={MovieList} />

        {/* details and edit pages route to dedicated ids */}
        <Route path="/details/:id" component={Details} />
        <Route path="/edit/:id" component={EditMovie} />

        {/* add movie page */}
        <Route path="/addMovie" component={AddMovie} />

        {/* admin page for genre management */}
        <Route path="/admin" component={Admin} />
      </Router>
    </div>
  );
}

export default App;
