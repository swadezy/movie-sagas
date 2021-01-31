import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();

  // tells saga watcher to work with db to store full movie and genre lists in reducers
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  // gets full movie and genre lists from reducers and saves locally
  const movies = useSelector((store) => store.movies);
  const genres = useSelector((store) => store.genres);

  // saves search params in state to be passed to db by saga watchers
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState(1);

  // tells saga watcher to work with filter router to show filtered movie list by search string
  const handleFilter = (event) => {
    event.preventDefault();
    console.log('received filter query', searchQuery);
    dispatch({ type: 'FILTER_MOVIES_STRING', payload: searchQuery });
  };

  // tells saga watcher to work with filter router to show filtered movie list by genre
  const handleGenre = (event) => {
    event.preventDefault();
    console.log('selected genre', genreFilter);
    dispatch({ type: 'FILTER_MOVIES_GENRE', payload: genreFilter });
  };

  // tells saga watcher to fetch full movie list and save in reducer, effectively clearing the search
  const handleClear = (event) => {
    event.preventDefault();
    dispatch({ type: 'FETCH_MOVIES' });
    setSearchQuery('');
    setGenreFilter(0);
  };

  return (
    <main>
      <h2>Movie List</h2>

      {/* take search string and filters movie list with that string */}
      <div className="inline">Search Movies:</div>
      <form className="inline" onSubmit={handleFilter}>
        <input
          className="inline"
          placeholder="..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      <form onSubmit={handleGenre}>
        <select
          name="genre"
          onChange={(event) => setGenreFilter(event.target.value)}
        >
          {/* maps over genres to create option for each */}
          {genres &&
            genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
        <button className="btn" type="submit">
          Filter by Genre
        </button>
      </form>

      <button className="btn" onClick={handleClear}>
        Clear Filters
      </button>

      {/* maps over movie list and creates div for each */}
      <section className="movies">
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

      {/* page only displays 10 movies - if there are more, this tells user to search for them */}
      {movies[0]?.total_movies > 10 ? (
        <h3>use search to find more movies</h3>
      ) : (
        <h3>these are all the movies!</h3>
      )}
    </main>
  );
}

export default MovieList;
