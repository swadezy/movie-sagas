import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function Details() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const movie = useSelector((store) => store.details[0]);

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: page.id });
  }, []);

  const handleEdit = () => {};

  const handleDelete = () => {
    dispatch({ type: 'DELETE_MOVIE', payload: page.id });
    history.push('/');
  };

  return (
    <main>
      <h3>{movie?.title}</h3>
      <img src={movie?.poster} alt={movie?.title} />
      <br></br>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <h5>{movie?.description}</h5>
      <h5>{movie?.genres}</h5>
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        Back to List
      </button>
    </main>
  );
}

export default Details;
