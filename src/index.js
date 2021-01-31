import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FILTER_MOVIES_STRING', filterMovies);
  yield takeEvery('FILTER_MOVIES_GENRE', filterMoviesGenre);
  yield takeEvery('POST_MOVIE', postMovie);
  yield takeEvery('DELETE_MOVIE', deleteMovie);
  yield takeEvery('PUT_MOVIE', putMovie);
  yield takeEvery('FETCH_GENRES', fetchGenres);
  yield takeEvery('FETCH_DETAILS', fetchDetails);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch (error) {
    console.log('error received', error);
  }
}

function* filterMovies(action) {
  // get filtered movies from db based on search string
  try {
    console.log('filterMovies received', action.payload);
    const movies = yield axios.get(`/api/movie/search/${action.payload}`);
    console.log('filtered with query:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch (error) {
    console.log('error received', error);
  }
}

function* filterMoviesGenre(action) {
  // get filtered movies from db based on genre id
  try {
    console.log('filterMoviesGenre received', action.payload);
    const movies = yield axios.get(`/api/movie/genre/${action.payload}`);
    console.log('filtered with genre', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch (error) {
    console.log('error received', error);
  }
}

function* postMovie(action) {
  // adds movie to db
  try {
    console.log('in post with movie', action.payload);
    yield axios.post('/api/movie', action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('error received', error);
  }
}

function* deleteMovie(action) {
  // deletes movie from db
  try {
    console.log('in delete for movie id', action.payload);
    yield axios.delete(`api/movie/${action.payload}`);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('error received', error);
  }
}

function* putMovie(action) {
  // updates movie in db
  try {
    console.log('in put movie for movie id', action.payload.id);
    yield axios.put(`api/movie/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('error received', error);
  }
}

function* fetchGenres() {
  // gets list of genres from db
  try {
    const genres = yield axios.get('/api/genre');
    console.log('got genres', genres.data);
    yield put({ type: 'SET_GENRES', payload: genres.data });
  } catch (error) {
    console.log('error received', error);
  }
}

function* fetchDetails(action) {
  // get one movie from DB for detail page
  try {
    console.log('in fetch saga for id', action.payload);
    const movie = yield axios.get(`/api/movie/${action.payload}`);
    yield put({ type: 'SET_DETAILS', payload: movie.data });
  } catch (error) {
    console.log('error received', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// used to store movie info and genres of one movie returned from server
const details = (state = [], action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
