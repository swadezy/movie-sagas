import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './EditMovie.css';

function EditMovie() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // tells saga watchers to work with db to store selected movie in details reducer
  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: page.id });
  }, []);

  // gets selected movie from details reducer and saves it locally
  const movie = useSelector((store) => store.details[0]);

  // saves edited movie info in state to be passed to db by saga watchers
  const [editMovie, setEditMovie] = useState({
    id: page.id,
    title: '',
    description: '',
  });

  // tells saga watchers to update movie at this id, then routes back to details page
  const handleEdit = (event) => {
    event.preventDefault();
    console.log('in edit movie with new movie', editMovie);
    dispatch({ type: 'PUT_MOVIE', payload: editMovie });
    history.push(`/details/${page.id}`);
  };

  return (
    <div className="edit-movie">
      <h2>Edit Details</h2>
      <div className="grid-wrapper">
        <img src={movie?.poster} alt={movie?.title} className="grid-poster" />
        <h4 className="grid-existing-header">Existing Movie Info</h4>
        <h4 className="grid-updated-header">Updated Movie Info</h4>
        <div className="grid-existing-title">{movie?.title}</div>
        <form onSubmit={handleEdit}>
          <input
            type="text"
            className="grid-title-input"
            placeholder="...title"
            value={editMovie.title}
            onChange={(event) =>
              setEditMovie({ ...editMovie, title: event.target.value })
            }
          />
        </form>
        <div className="grid-existing-description">{movie?.description}</div>
        <form onSubmit={handleEdit}>
          <textarea
            type="text"
            className="grid-description-textarea"
            placeholder="...description"
            value={editMovie.description}
            onChange={(event) =>
              setEditMovie({ ...editMovie, description: event.target.value })
            }
          />
        </form>
        <div className="grid-button-group">
          <button className="btn" onClick={handleEdit}>
            Submit
          </button>
          {/* cancel button routes back to details on click */}
          <button
            className="btn"
            onClick={() => {
              history.push({ pathname: `/details/${page.id}` });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
