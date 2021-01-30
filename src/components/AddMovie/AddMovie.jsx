import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: '',
    description: '',
  });

  const routeBack = () => {
    history.push('/');
  };

  const addMovie = (event) => {
    event.preventDefault();
    console.log('in addMovie with movie', newMovie);
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
        <select>
          <option></option>
        </select>
        <button type="submit">Submit</button>
        <button onClick={routeBack}>Cancel</button>
      </form>
    </div>
  );
}

export default AddMovie;
