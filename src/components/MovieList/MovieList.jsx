import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();

    //grabing the store/reducer that holds all the movies from the database
    const movies = useSelector(store => store.movies);

    //useing useEffect to render to the DOM as soon as it loads
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //moving this to onClick in the return to get the id
    //keeping this here to remind me why I moved it

    // function handleClick(id){
    //     console.log('Inside handleClick()')
    //     dispatch({ 
    //         type: 'DETAILS_MOVIES', 
    //         payload: movies.id });

    //     history.push('/details')
    // }

    function movieForm(){
        history.push('/movies')
    }

    //the dispatch is grabbing all the info/id and putting it in a saga that is attached to a reducer that is holding what was clicked
    return (
        <main>
            
            <h2>MovieList</h2>
            <button className='addButton' onClick={movieForm}>Add Your Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={() => {
                                dispatch({
                                    type: 'DETAILS_MOVIES',
                                    payload: movie.id
                                });
                                history.push('/details')
                            }} className='moviePoster' src={movie.poster} alt={movie.title} />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;