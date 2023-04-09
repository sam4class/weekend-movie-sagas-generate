import { useSelector } from "react-redux";

function AddedMovie(){

    const newMovie = useSelector((store) => store.newMovie)

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