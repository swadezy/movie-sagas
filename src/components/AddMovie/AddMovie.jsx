import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
  const dispatch = useDispatch();
  const history = useHistory();

  // tells saga watchers to work with db to store genres in genres reducer
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  // gets genre list from genres reducer and saves locally
  const genres = useSelector((store) => store.genres);

  // saves new movie info in state to be passed to db by saga watchers
  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: '',
    description: '',
    genre_id: 1,
  });

  // tells saga watchers to add the new movie, then routes back to details page
  const addMovie = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_MOVIE', payload: newMovie });
    history.push('/');
  };

  return (
    <div>
      <h3>AddMovie</h3>
      <form onSubmit={addMovie}>
        <input
          type="text"
          placeholder="...title"
          value={newMovie.title}
          onChange={(event) =>
            setNewMovie({ ...newMovie, title: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="...url"
          value={newMovie.poster}
          onChange={(event) =>
            setNewMovie({ ...newMovie, poster: event.target.value })
          }
        />
        <textarea
          type="text"
          placeholder="description..."
          value={newMovie.description}
          onChange={(event) =>
            setNewMovie({ ...newMovie, description: event.target.value })
          }
        />
        <select
          name="category"
          onChange={(event) =>
            setNewMovie({ ...newMovie, genre_id: event.target.value })
          }
        >
          {/* maps over genres to create option for each */}
          {genres &&
            genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
        <button type="submit">Submit</button>
        {/* routes back home on click */}
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
