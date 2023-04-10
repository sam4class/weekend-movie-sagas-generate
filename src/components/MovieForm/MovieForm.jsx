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
                genre_id: addGenre
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
                <option label="Adventure" value="1"></option>
                <option label="Animated" value="2"></option>
                <option label="Biographical" value="3"></option>
                <option label="Comedy" value="4"></option>
                <option label="Disaster" value="5"></option>
                <option label="Drama" value="6"></option>
                <option label="Epic" value="7"></option>
                <option label="Fanstasy" value="8"></option>
                <option label="Musical" value="9"></option>
                <option label="Romantic" value="10"></option>
                <option label="Science Fiction" value="11"></option>
                <option label="Space-Opera" value="12"></option>
            </select>
            </label><br />
            <p>Genre: {addGenre}</p>

            <button className='button' type="submit">Save Movie</button><br />
            <button className='button' onClick={cancelMovie}>Cancel</button>
            </form>
            
            {/* <button className='button' onClick={cancelMovie}>Cancel</button> */}
            {/* <h3>Last Movie You Added Today:</h3>
             <AddedMovie /> */}
            {/* {newMovie ?
            <>
                <img src={newMovie.poster} />
                <li className="title">{newMovie.title}</li>
                <li>{newMovie.name}</li>
                <li>{newMovie.description}</li>
                
            </>
            : <p>Waiting For Your Movie</p>} */}
    
            {/* <pre>{JSON.stringify(newMovie)}</pre> */}
        
        </>)
 }

 export default MovieForm;