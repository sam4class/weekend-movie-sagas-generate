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
    //FETCH_MOVIES is shouted with reducer SET_MOVIES to GET all the movies in the database: const movies
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    //DETAILS_MOVIES is shouted with reducer SET_DETAILS to GET the movie clicked: const genres
    yield takeEvery('DETAILS_MOVIES', fetchDetails);
    //SET_NEW_MOVIE is shouted with reducer SET_NEW_MOVIE to POST the new movie from input fields: const newMovie
    yield takeEvery('SET_NEW_MOVIE', postNewMovie);
}

function* fetchDetails(action){
    console.log('inside fetchDetails', action)
    try{
        const details = yield axios.get(`/api/movie/${action.payload}`)
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
        console.log('POST saga', action.payload); //not getting it, because I had the wrong thing in values="" in dropdown: fixed!
        yield put({type: 'FETCH_MOVIE'})  
    }catch(err) {
        console.log('error in fetchNewMovie', err)
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
//called in function* that handshakes with the server GET
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
//called in function* that handshakes with the server GET.id
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
//Used to store the infromation given the the input form
//called in function* that handshakes with the server POST
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
