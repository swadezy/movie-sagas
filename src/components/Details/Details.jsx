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

  const routeBack = () => {
    history.push('/')
  }

  return (
    <main>
      <h3>{movie?.title}</h3>
      <img src={movie?.poster} alt={movie?.title} />
      <h5>{movie?.description}</h5>
      <h5>{movie?.genres}</h5>
      <button onClick={routeBack}>Back to List</button>
    </main>
  );
}

export default Details;
