import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //moving this to onClick to get the id
    // function handleClick(id){
    //     console.log('Inside handleClick()')
    //     dispatch({ 
    //         type: 'DETAILS_MOVIES', 
    //         payload: movies.id });

    //     history.push('/details')
    // }

    return (
        <main>
            <h1>MovieList</h1>
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
                            }} src={movie.poster} alt={movie.title} />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;