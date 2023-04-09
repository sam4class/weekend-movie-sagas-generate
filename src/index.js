import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
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
    yield takeEvery('DETAILS_MOVIES', fetchDetails)
    yield takeEvery('SET_NEW_MOVIE', postNewMovie)
}

function* fetchDetails(action){
    console.log('inside fetchDetails', action)
    try{
        const details = yield axios.get(`/api/genre/${action.payload}`)
        // const detailMovie = yield axios.get(`/api/movie/${action.payload}`)
        // yield put({type: 'SET_GENRES', payload:{ genre: details.data, movie: detailMovie.data}})
        yield put({type: 'SET_GENRES', payload: details.data})

    }catch(err){
        console.log('err in fetchDetails index.js', err)
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch(err){
        console.log('get all error', err);
    }
        
}

function* postNewMovie(action) {
    // console.log('in postNewMovie', action.payload)
    try{
        yield axios.post(`/api/movie`, action.payload)
        console.log('POST saga', action.payload); //it's not getting it
        yield put({type: 'FETCH_MOVIE'})  
    }catch(err) {
        console.log('error in fetchNewMovie', err)
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
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const newMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_NEW_MOVIE':
            return action.payload;
        case 'CLEAR_NEW_MOVIE':
            return [];
    }
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        newMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
