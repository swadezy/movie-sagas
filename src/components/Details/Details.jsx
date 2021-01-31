import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function Details() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // tells saga watchers to work with db to store selected movie in details reducer
  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: page.id });
  }, []);

  // gets selected movie from details reducer and saves locally
  const movie = useSelector((store) => store.details[0]);

  // tells saga watchers to delete movie at this id, then route back to home
  const handleDelete = () => {
    dispatch({ type: 'DELETE_MOVIE', payload: page.id });
    history.push('/');
  };

  return (
    <main>
      <h3>{movie?.title}</h3>
      <img src={movie?.poster} alt={movie?.title} />
      <br></br>

      {/* routes to dedicated edit page on click */}
      <button
        onClick={() => {
          history.push({ pathname: `/edit/${page.id}` });
        }}
      >
        Edit
      </button>

      {/* deletes item from db and routes back home on click */}
      <button onClick={handleDelete}>Delete</button>
      <h5>{movie?.description}</h5>
      <h5>Genres: {movie?.genres}</h5>

    </main>
  );
}

export default Details;
