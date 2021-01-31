import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();

  // tells saga watcher to work with db to store full movie list in movies reducer
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  // gets full movie list from movies reducer and saves locally
  const movies = useSelector((store) => store.movies);

  // saves search params in state to be passed to db by saga watchers
  const [searchQuery, setSearchQuery] = useState('');

  // tells saga watcher to work with filter router to show filtered movie list
  const handleFilter = (event) => {
    event.preventDefault();
    console.log('received filter query', searchQuery);
    dispatch({ type: 'FILTER_MOVIES', payload: searchQuery });
  };

  // tells saga watcher to fetch full movie list and save in reducer, effectively clearing the search
  const handleClear = (event) => {
    event.preventDefault();
    dispatch({ type: 'FETCH_MOVIES' });
    setSearchQuery('');
  };

  return (
    <main>
      <h2>Movie List</h2>
      <div>Search Movies:</div>
      <form onSubmit={handleFilter}>
        <input
          placeholder="..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button className="btn" type="submit">
          Search
        </button>
        <button className="btn" onClick={handleClear}>
          Clear Search
        </button>
      </form>
      <section className="movies">
        {/* maps over movie list and creates div for each */}
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              // routes to dedicated details page on click
              onClick={() => {
                history.push({ pathname: `/details/${movie.id}` });
              }}
            >
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
