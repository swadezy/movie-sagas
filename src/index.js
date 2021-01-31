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

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FILTER_MOVIES', filterMovies);
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
  try {
    const movies = yield axios.get(`/api/movie/filter/${action.payload}`);
    console.log('filtered with query:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch (error) {
    console.log('error received', error);
  }
}

function* postMovie(action) {
  try {
    console.log('in post with movie', action.payload);
    yield axios.post('/api/movie', action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('error received', error);
  }
}

function* deleteMovie(action) {
  try {
    console.log('in delete for movie id', action.payload);
    yield axios.delete(`api/movie/${action.payload}`);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('error received', error);
  }
}

function* putMovie(action) {
  try {
    console.log('in put movie for movie id', action.payload.id);
    yield axios.put(`api/movie/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('error received', error);
  }
}

function* fetchGenres() {
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

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

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
