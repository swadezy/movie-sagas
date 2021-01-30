import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Details() {
  const dispatch = useDispatch();
  const movieObject = useSelector(store => store.movies)
  const movieDetails = movieObject.movies;
  const movieGenres = movieObject.genres;

  const page = useParams();

  useEffect(() => {
    console.log('in details of id', page.id);
    dispatch({ type: 'FETCH_DETAIL', payload: page.id });
    console.log(movieObject);
  }, []);

  return (
      <h1>{movieDetails?.title}</h1>
  )
}

export default Details;
