import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';
import Button from "react-bootstrap/Button";

// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  console.log(movie);
  if (!movie) {
    return <div>Loading</div>
  }
  return (
    <div className="row px-10 py-3 MovieView">
      <div className="col-md-7">
        <img src={movie.ImagePath} alt={movie.Title} className="MovieViewImage w-100" />
      </div>
      <div className="col-md-5 MovieView">
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <span>{movie.Title}</span>
          </li>
          <li className="list-group-item">
            <span>{movie.Description}</span>
          </li>
          <li className="list-group-item">
            <span>Director: </span>
            <br />
            <span>{movie.Director.Name}</span>
            <br /><span>Birth: </span>
            <span>{movie.Director.Birth}</span>
            <br />
            <span>Bio: </span>
            <span>{movie.Director.Bio}</span>
            
            {/* <br /><span>Death: </span>
            <span>{movie.Director.Death}</span> */}
          </li>
          <li className="list-group-item">
            <span>Genre:</span>
            <br /><span>{movie.Genre.Name}</span>
          </li>
          <li className="list-group-item">
            <span>Release: </span>
            <span>{movie.Release}</span>  
          </li>
          <li className="list-group-item">
            <span>Actors: </span>
            <br />
            <span>{movie.Actors.join(", ")}</span>
          </li>
        </ul>
        <Link to={`/`}>
          <Button variant='dark'>Back</Button>
        </Link>
        
    </div>
  </div>
    
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      GenreName: PropTypes.string
    }),
    Director: PropTypes.shape({
      DirectorName: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }),
    Featured: PropTypes.bool,
  })),
  // onBackClick: PropTypes.func.isRequired
};