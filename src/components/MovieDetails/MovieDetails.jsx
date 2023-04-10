import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function MovieDetails() {

    const history = useHistory();

    //grabbing the store/reducer that is holding the items clicked
    const genres = useSelector((store) => store.genres)
    console.log('in details', genres)


    function handleClick() {
        history.push('/')
    }


    //this is looping through the store that is holding info to place on the DOM what we need the user to see
    //put it in a ternary to make sure the race condition is paused when needed to catch up the render
    return (<>
        <h2>Movie Details</h2>
        <button className='button' onClick={handleClick}>Back to List</button>
        <br />

        {genres.length ?
            <>
                <img className="poster" src={genres[0].poster} />
                <p className="title">{genres[0].title}</p>
               
                {genres.map((title) => (
                    <span className='genreText' key={title.id}>
                        <li></li>{title.name}
                    </span>
                ))}
                <p className='description' >{genres[0].description}</p>
            </>
            : <p>Waiting For Movie</p>}
    

    </>)
}

export default MovieDetails;