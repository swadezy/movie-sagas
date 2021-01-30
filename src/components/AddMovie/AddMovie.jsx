import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((store) => store.genres);
  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: '',
    description: '',
    genre_id: 1,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const routeBack = () => {
    history.push('/');
  };

  const addMovie = (event) => {
    event.preventDefault();
    console.log('in addMovie with movie', newMovie);
    dispatch({ type: 'POST_MOVIE', payload: newMovie });
    history.push('/');
  };

  return (
    <div>
      <h3>AddMovie</h3>
      <button onClick={routeBack}>Back to List</button>
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
          {genres &&
            genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          Back to List
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
