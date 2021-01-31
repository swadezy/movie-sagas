import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();

  // tells saga watchers to work with db to store full movie list in movies reducer
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  // gets full movie list from movies reducer and saves locally
  const movies = useSelector((store) => store.movies);

  return (
    <main>
      <h3>Movie List</h3>
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
