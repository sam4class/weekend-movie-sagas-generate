import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function MovieDetails() {

    const history = useHistory();
    const genres = useSelector((store) => store.genres)
    console.log('in details', genres)


    function handleClick() {
        history.push('/')
    }



    return (<>
        <h1>Movie Details</h1>
        <button onClick={handleClick}>Back to List</button>
        <br />

        {genres.length ?
            <>
                <img src={genres[0].poster} />
                <li>Title: {genres[0].title}</li>
                <li>Description: {genres[0].description}</li>
                {genres.map((title) => (
                    <ul key={title.id}>
                        <li>{title.name}</li>
                    </ul>
                ))}
            </>
            : <p>Waiting For Movie</p>}
        

    </>)
}

export default MovieDetails;