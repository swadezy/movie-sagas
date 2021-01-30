import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Details() {
  const dispatch = useDispatch();
  const movieObject = useSelector((store) => store.movies);

  const page = useParams();

  useEffect(() => {
    console.log('in details of id', page.id);
    dispatch({ type: 'FETCH_DETAIL', payload: page.id });
    console.log(movieObject);
  }, []);

  return (
    <div>
        {movieObject && <h3>{JSON.stringify.movieObject}</h3>}
      <h1>{movieObject?.movies?.title}</h1>
      <h1>{JSON.stringify?.movieObject}</h1>
      <h1>Fart</h1>
    </div>
  );
}

export default Details;
