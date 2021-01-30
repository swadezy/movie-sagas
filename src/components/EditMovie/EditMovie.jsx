import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function EditMovie() {
  const page = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: page.id });
  }, []);

  const movie = useSelector((store) => store.details[0]);

  return (
    <div>
      <h3>Edit Details</h3>
      <h5>{movie?.title} : </h5>
      <input />
      <h5>{movie?.description} : </h5>
      <input />
      <button
        onClick={() => {
          history.push({ pathname: `/details/${page.id}` });
        }}
      >
        Back to Movie
      </button>
    </div>
  );
}

export default EditMovie;
