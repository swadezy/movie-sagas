import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
    genre_id: 0,
  });

  // tells saga watchers to add the new movie, then routes back to details page
  const addMovie = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_MOVIE', payload: newMovie });
    history.push('/');
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={addMovie}>
        <TextField
          id="title-input"
          label="add movie title"
          type="text"
          placeholder="...title"
          variant="outlined"
          value={newMovie.title}
          onChange={(event) =>
            setNewMovie({ ...newMovie, title: event.target.value })
          }
        />

        <TextField
          id="url-input"
          label="add poster url"
          type="text"
          placeholder="...url"
          variant="outlined"
          value={newMovie.poster}
          onChange={(event) =>
            setNewMovie({ ...newMovie, poster: event.target.value })
          }
        />

        <TextField
          id="description-input"
          label="add movie description"
          type="text"
          placeholder="description..."
          variant="outlined"
          multiline
          rows={2}
          value={newMovie.description}
          onChange={(event) =>
            setNewMovie({ ...newMovie, description: event.target.value })
          }
        />

        <FormControl variant="outlined" size="small">
          <InputLabel id="genre-add-select">Genre</InputLabel>
          <Select
            name="genre"
            labelId="genre-add"
            id="genre-add"
            value={newMovie.genre_id}
            onChange={(event) =>
              setNewMovie({ ...newMovie, genre_id: event.target.value })
            }
          >
            <MenuItem key={0} value={0}>
              ...select genre
            </MenuItem>
            {/* maps over genres to create option for each */}
            {genres &&
              genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="primary" type="submit">
          Submit
        </Button>
        {/* routes back home on click */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            history.push('/');
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default AddMovie;
