import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import AddedMovie from '../AddedMovie/AddedMovie';
import { useHistory } from 'react-router-dom';

 
 function MovieForm(){

    const [addTitle, setAddTitle] = useState([]);
    const [addPoster, setAddPoster] = useState([]);
    const [addDescription, setAddDescription] = useState([]);

    const [addGenre, setAddGenre] = useState('')

    const newMovie = useSelector((store) => store.newMovie);
    const dispatch = useDispatch();
    const history = useHistory();

    function addMovie(event){
        event.preventDefault();
        dispatch({
            type: 'SET_NEW_MOVIE',
            payload: {
                title: addTitle,
                poster: addPoster,
                description: addDescription,
                name: addGenre 
            }
        })
        setAddTitle('')
        setAddPoster('')
        setAddDescription('')
        setAddGenre('')

        history.push('/')
    }
    

    function cancelMovie(){
        history.push('/')
    }


    
    return (<>
    
        <h2>Add a Movie!</h2>

        <form onSubmit={addMovie}>
            <input type="text" placeholder="Movie Title" value={addTitle} onChange={(event) => setAddTitle(event.target.value)}/><br />
            <input type="text" placeholder="Movie Poster Image" value={addPoster} onChange={(event) => setAddPoster(event.target.value)}/><br />
            <input type="text" placeholder="Description of Movie" value={addDescription} onChange={(event) => setAddDescription(event.target.value)}/><br />

            <label>Pick A Genre

            <select value={addGenre} onChange={(event) => setAddGenre(event.target.value)}>
                <option label="" value="empty"></option>
                <option label="Adventure" value="Adventure"></option>
                <option label="Animated" value="Animated"></option>
                <option label="Biographical" value="Biographical"></option>
                <option label="Comedy" value="Comedy"></option>
                <option label="Disaster" value="Disaster"></option>
                <option label="Drama" value="Drama"></option>
                <option label="Epic" value="Epic"></option>
                <option label="Fanstasy" value="Fanstasy"></option>
                <option label="Musical" value="Musical"></option>
                <option label="Romantic" value="Romantic"></option>
                <option label="Science Fiction" value="Science Fiction"></option>
                <option label="Space-Opera" value="Space-Opera"></option>
            </select>
            </label><br />
            <p>Genre: {addGenre}</p>

            <button className='button' type="submit">Save Movie</button><br />
            <button className='button' onClick={cancelMovie}>Cancel</button>
            </form>
            {/* <button className='button' onClick={cancelMovie}>Cancel</button> */}

            {/* <h2>Your Added Movie:</h2> */}
            {/* <h3>Last Movie You Added:</h3>
            {newMovie ?
            <>
                <img src={newMovie.poster} />
                <li className="title">{newMovie.title}</li>
                <li>{newMovie.name}</li>
                <li>{newMovie.description}</li>
                
            </>
            : <p>Waiting For Your Movie</p>}
     */}
            {/* <pre>{JSON.stringify(newMovie)}</pre> */}
        
        </>)
 }

 export default MovieForm;