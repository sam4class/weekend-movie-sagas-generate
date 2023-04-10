import { useSelector } from "react-redux";

function AddedMovie(){
    //this is actually now called anywhere
    //because the POST updates the MovieList we see it when we go back to the Home Page

    const newMovie = useSelector((store) => store.newMovie)
    
    //added a ternary just in case!
    return (<>
        {newMovie ?
            <>
                <img src={newMovie.poster} />
                <li>Title: {newMovie.title}</li>
                <li>Description: {newMovie.description}</li>
                <li>Genre:{newMovie.name}</li>
            </>
            : <p>Waiting For Your Movie</p>}
            </>
    )
}

export default AddedMovie;