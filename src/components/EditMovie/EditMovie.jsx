import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function EditMovie() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const movie = useSelector((store) => store.details[0]);
  const [editMovie, setEditMovie] = useState({ id: page.id, title: '', description: '' });

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: page.id });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    console.log('in edit movie with new movie', editMovie);
    dispatch({ type: 'PUT_MOVIE', payload: editMovie });
    history.push(`/details/${page.id}`);
  };

  return (
    <div>
      <h3>Edit Details</h3>
      <form onSubmit={handleEdit}>
        <h5>{movie?.title} : </h5>
        <input
          type="text"
          placeholder="new title..."
          value={editMovie.title}
          onChange={(event) =>
            setEditMovie({ ...editMovie, title: event.target.value })
          }
        />
        <h5>{movie?.description} : </h5>
        <textarea
          type="text"
          placeholder="new description..."
          value={editMovie.description}
          onChange={(event) =>
            setEditMovie({ ...editMovie, description: event.target.value })
          }
        />
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            history.push({ pathname: `/details/${page.id}` });
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditMovie;
